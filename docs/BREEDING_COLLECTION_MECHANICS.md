# Breeding & Collection Mechanics Specification

## Core Philosophy
Breeding isn't just about stats—it's about discovering hidden creature variants, unlocking lore, and creating unique stories through genetic combinations.

## Breeding System Architecture

### Genetic Model

```typescript
interface CreatureGenetics {
  // Visible traits
  species: SpeciesId
  variant: VariantType // Normal, Shadow, Pure, Twilight, Shiny
  
  // Hidden traits (IVs equivalent)
  potential: {
    hp: number      // 0-31
    attack: number  // 0-31
    defense: number // 0-31
    speed: number   // 0-31
    special: number // 0-31
  }
  
  // Inherited traits
  nature: NatureType // Affects stat growth
  ability: AbilityId // Can be hidden ability
  
  // Breeding specific
  eggGroup: EggGroup[]
  hatchTime: number // Steps needed
  
  // Unique genetics
  geneticMarkers: GeneticMarker[] // Special inheritable traits
  mutationChance: number // Chance for variant offspring
  
  // Narrative genetics
  corruptionResistance: number // -100 to 100
  bondStrength: number // Affects loyalty inheritance
}

interface GeneticMarker {
  id: string
  name: string
  effect: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  inheritance_chance: number
  combines_with?: string[] // Other markers for special outcomes
}
```

### Breeding Mechanics

```typescript
interface BreedingPair {
  parent1: Creature
  parent2: Creature
  compatibility: number // 0-100%
  offspring_possibilities: OffspringPrediction[]
}

interface OffspringPrediction {
  species: SpeciesId
  probability: number
  variant_chances: Record<VariantType, number>
  inherited_moves: MoveId[]
  special_traits: string[]
}

class BreedingEngine {
  calculateCompatibility(parent1: Creature, parent2: Creature): number {
    let compatibility = 0
    
    // Same species = 50% base
    if (parent1.speciesId === parent2.speciesId) {
      compatibility += 50
    }
    
    // Same egg group = 30% per group
    const sharedGroups = parent1.eggGroups.filter(g => 
      parent2.eggGroups.includes(g)
    )
    compatibility += sharedGroups.length * 30
    
    // Opposite gender = 20%
    if (parent1.gender !== parent2.gender) {
      compatibility += 20
    }
    
    // Special cases
    if (parent1.variant === 'Shadow' && parent2.variant === 'Pure') {
      compatibility += 30 // Twilight offspring chance
    }
    
    // Bond level affects compatibility
    compatibility += (parent1.loyalty + parent2.loyalty) / 20
    
    return Math.min(compatibility, 100)
  }
  
  generateOffspring(parent1: Creature, parent2: Creature): Creature {
    const offspring: Creature = {
      species: this.determineSpecies(parent1, parent2),
      variant: this.determineVariant(parent1, parent2),
      potential: this.inheritIVs(parent1, parent2),
      nature: this.inheritNature(parent1, parent2),
      ability: this.inheritAbility(parent1, parent2),
      moves: this.inheritMoves(parent1, parent2),
      geneticMarkers: this.combineMarkers(parent1, parent2),
      corruptionResistance: this.averageCorruption(parent1, parent2),
      shiny: this.rollShiny(parent1, parent2)
    }
    
    // Mutation chance
    if (Math.random() < this.getMutationChance(parent1, parent2)) {
      offspring = this.applyMutation(offspring)
    }
    
    return offspring
  }
  
  private determineVariant(p1: Creature, p2: Creature): VariantType {
    const variants = {
      'Normal+Normal': { Normal: 95, Shiny: 5 },
      'Shadow+Shadow': { Shadow: 90, Void: 10 },
      'Pure+Pure': { Pure: 90, Radiant: 10 },
      'Shadow+Pure': { Twilight: 60, Normal: 30, Chaos: 10 },
      'Shadow+Normal': { Shadow: 50, Normal: 40, Corrupted: 10 },
      'Pure+Normal': { Pure: 50, Normal: 40, Blessed: 10 }
    }
    
    const combo = `${p1.variant}+${p2.variant}`
    const chances = variants[combo] || variants['Normal+Normal']
    
    return this.weightedRandom(chances)
  }
}
```

### Egg System

```typescript
interface Egg {
  id: string
  parents: [CreatureId, CreatureId]
  species: SpeciesId // Hidden until hatched
  current_steps: number
  required_steps: number
  hatch_bonus: HatchBonus[]
  discovery_hints: string[] // Revealed as egg develops
}

interface HatchBonus {
  condition: string
  effect: string
  achieved: boolean
}

const hatchBonuses: HatchBonus[] = [
  {
    condition: "Hatch in corrupted zone",
    effect: "+10 corruption resistance",
    achieved: false
  },
  {
    condition: "Hatch during boss battle",
    effect: "Brave nature guaranteed",
    achieved: false
  },
  {
    condition: "Hatch with full party of same type",
    effect: "Perfect IV in primary type stat",
    achieved: false
  },
  {
    condition: "Hatch after 100 victories",
    effect: "Starts with egg move",
    achieved: false
  }
]

// Egg development stages
const eggStages = {
  0: "A mysterious egg. Wonder what's inside?",
  25: "The egg moves occasionally.",
  50: "You can hear sounds coming from inside.",
  75: "The egg is showing cracks!",
  90: "It's about to hatch!",
  100: "The egg is hatching!"
}
```

## Collection Mechanics

### Comprehensive Tracking

```typescript
interface CollectionData {
  // Basic collection
  seen: Set<SpeciesId>
  caught: Set<SpeciesId>
  
  // Advanced collection
  variants_collected: Record<SpeciesId, VariantType[]>
  shiny_collected: Set<SpeciesId>
  perfect_iv_collected: Set<SpeciesId>
  
  // Breeding collection
  eggs_hatched: number
  unique_breeds: Set<string> // "species1+species2"
  genetic_markers_discovered: Set<GeneticMarkerId>
  
  // Special collections
  corrupted_purified: Set<SpeciesId>
  shadow_evolved: Set<SpeciesId>
  legendary_befriended: Set<SpeciesId>
  
  // Completion metrics
  completion_percentage: number
  living_dex: boolean // One of each in storage
  variant_dex: boolean // All variants collected
  shiny_dex: boolean // All shinies collected
}
```

### Encyclopedia System

```typescript
interface CreatureEntry {
  species: SpeciesId
  discovered: boolean
  data_completion: number // 0-100%
  
  // Progressive unlocks
  basic_info: {
    name: string
    types: Type[]
    description: string
    unlocked: boolean // After first encounter
  }
  
  habitat_info: {
    locations: LocationId[]
    rarity: RarityTier
    time_of_day: TimePreference
    weather_preference: Weather[]
    unlocked: boolean // After catching
  }
  
  stats_info: {
    base_stats: Stats
    stat_graph: StatVisualization
    unlocked: boolean // After 5 caught
  }
  
  breeding_info: {
    egg_groups: EggGroup[]
    hatch_time: number
    gender_ratio: number
    unlocked: boolean // After breeding
  }
  
  lore_entries: LoreEntry[]
  variants_discovered: VariantInfo[]
  evolution_paths: EvolutionPath[]
  
  // Special entries
  corruption_lore?: string // Unlocked in corrupted areas
  purification_method?: string // Discovered through gameplay
  hidden_ability?: AbilityInfo // Rare discovery
}

interface LoreEntry {
  id: string
  title: string
  text: string
  unlock_condition: UnlockCondition
  author?: string // In-world character
  corruption_level: number // How dark is this lore
}

// Progressive lore unlocks
const sproutLore: LoreEntry[] = [
  {
    title: "Basic Entry",
    text: "A plant creature that photosynthesizes.",
    unlock_condition: { type: 'seen' }
  },
  {
    title: "Behavioral Study",
    text: "Sprouts gather in groups at dawn to absorb dew.",
    unlock_condition: { type: 'caught', count: 1 }
  },
  {
    title: "Ancient Text",
    text: "Before the fading, Sprouts were guardians of the forest temples.",
    unlock_condition: { type: 'caught', count: 10 }
  },
  {
    title: "Corrupted Data",
    text: "When Sprouts fade, the forest itself begins to die...",
    unlock_condition: { type: 'area_corruption', level: 50 }
  },
  {
    title: "Hidden Truth",
    text: "Sprouts aren't native to this world. They came through the first rift.",
    unlock_condition: { type: 'special', flag: 'defeated_shadow_sprout' }
  }
]
```

### Variant System

```typescript
interface VariantType {
  // Standard variants
  NORMAL: 'normal'
  SHINY: 'shiny' // 1/4096 chance
  
  // Corruption variants
  SHADOW: 'shadow' // Found in corrupted zones
  CORRUPTED: 'corrupted' // Advanced shadow form
  VOID: 'void' // Final shadow evolution
  
  // Purity variants  
  PURE: 'pure' // Purified shadows
  BLESSED: 'blessed' // Advanced pure form
  RADIANT: 'radiant' // Final pure evolution
  
  // Hybrid variants
  TWILIGHT: 'twilight' // Shadow + Pure breeding
  CHAOS: 'chaos' // Unstable genetics
  PRISMATIC: 'prismatic' // All types simultaneously
  
  // Event variants
  ANCIENT: 'ancient' // Time-locked areas
  SYNTHETIC: 'synthetic' // Lab-created
  PARADOX: 'paradox' // New Game+ exclusive
}

interface VariantModifiers {
  stat_modifiers: Partial<Stats>
  type_changes?: Type[]
  ability_override?: AbilityId
  move_pool_additions?: MoveId[]
  evolution_override?: EvolutionPath
  special_mechanics?: string[]
}

const variantEffects: Record<VariantType, VariantModifiers> = {
  SHADOW: {
    stat_modifiers: { attack: 1.2, defense: 0.8 },
    type_changes: ['ADD:dark'],
    special_mechanics: ['Damages user for 1/16 HP each turn', 'Immune to purification in battle']
  },
  PURE: {
    stat_modifiers: { defense: 1.2, special: 1.1 },
    type_changes: ['ADD:fairy'],
    special_mechanics: ['Heals 1/16 HP in sunlight', 'Takes 2x damage from dark moves']
  },
  TWILIGHT: {
    stat_modifiers: { all: 1.15 },
    special_mechanics: ['Can switch between Shadow and Pure form once per battle']
  },
  VOID: {
    stat_modifiers: { attack: 1.5, defense: 0.5 },
    type_changes: ['REPLACE:void'],
    special_mechanics: ['All moves gain lifesteal', 'Cannot be healed by items']
  }
}
```

### Evolution Complexity

```typescript
interface EvolutionPath {
  from: SpeciesId
  to: SpeciesId
  method: EvolutionMethod
  requirements: EvolutionRequirement[]
  narrative_unlock?: string
}

type EvolutionMethod = 
  | 'level'
  | 'item'
  | 'trade' // Simulated via NPC
  | 'friendship'
  | 'location'
  | 'time'
  | 'weather'
  | 'corruption'
  | 'purification'
  | 'breeding' // Only obtainable through breeding
  | 'fusion' // Combine two creatures
  | 'sacrifice' // Dark evolution method

interface EvolutionRequirement {
  type: string
  value: any
  hidden?: boolean // Not shown until discovered
}

// Complex evolution examples
const complexEvolutions: EvolutionPath[] = [
  {
    from: 'sprout',
    to: 'shadow_bloom',
    method: 'corruption',
    requirements: [
      { type: 'corruption_level', value: 50 },
      { type: 'battles_in_void', value: 10 },
      { type: 'loyalty', value: 'max', hidden: true }
    ],
    narrative_unlock: "Your Sprout trusts you enough to embrace the darkness together."
  },
  {
    from: 'ember',
    to: 'phoenix_flame',
    method: 'sacrifice',
    requirements: [
      { type: 'faint_count', value: 100 },
      { type: 'revive_count', value: 100 },
      { type: 'level', value: 50 }
    ],
    narrative_unlock: "Through countless defeats and rebirths, Ember transcends death itself."
  },
  {
    from: 'any_twilight',
    to: 'equilibrium',
    method: 'fusion',
    requirements: [
      { type: 'partner_variant', value: 'twilight' },
      { type: 'combined_level', value: 100 },
      { type: 'player_morality', value: [-10, 10] }
    ],
    narrative_unlock: "Two twilight souls merge into perfect balance."
  }
]
```

### Achievement System

```typescript
interface CollectionAchievement {
  id: string
  name: string
  description: string
  requirement: () => boolean
  reward: AchievementReward
  hidden?: boolean
  progress?: () => string
}

interface AchievementReward {
  type: 'item' | 'creature' | 'variant' | 'ability' | 'title'
  value: any
  narrative?: string
}

const collectionAchievements: CollectionAchievement[] = [
  {
    name: "Novice Collector",
    description: "Catch 10 different species",
    requirement: () => collection.caught.size >= 10,
    reward: { type: 'item', value: 'rare_ball_x5' }
  },
  {
    name: "Shiny Hunter",
    description: "Encounter your first shiny",
    requirement: () => collection.shiny_collected.size > 0,
    reward: { type: 'title', value: 'Lucky' }
  },
  {
    name: "Genetic Pioneer",
    description: "Discover 10 genetic markers",
    requirement: () => collection.genetic_markers_discovered.size >= 10,
    reward: { type: 'ability', value: 'marker_sight' }
  },
  {
    name: "Shadow Master",
    description: "Collect all shadow variants",
    requirement: () => checkAllShadowVariants(),
    reward: { 
      type: 'creature', 
      value: 'shadow_legendary',
      narrative: "The Shadow Sovereign acknowledges your mastery."
    }
  },
  {
    name: "Living Encyclopedia",
    description: "100% data on all species",
    requirement: () => allEntriesComplete(),
    reward: { 
      type: 'variant', 
      value: 'prismatic_unlock',
      narrative: "Reality bends to your complete understanding."
    },
    hidden: true
  }
]
```

### Rare Encounters

```typescript
interface RareEncounter {
  id: string
  creature: CreatureTemplate
  spawn_conditions: SpawnCondition[]
  encounter_rate: number // Base rate before modifiers
  one_time?: boolean
  narrative_trigger?: string
}

interface SpawnCondition {
  type: 'time' | 'weather' | 'corruption' | 'chain' | 'item' | 'achievement'
  value: any
  required: boolean
}

const rareEncounters: RareEncounter[] = [
  {
    id: "void_herald",
    creature: {
      species: "herald",
      variant: "void",
      level: 60,
      perfect_ivs: 3
    },
    spawn_conditions: [
      { type: 'corruption', value: 90, required: true },
      { type: 'time', value: 'midnight', required: true },
      { type: 'weather', value: 'void_storm', required: false }
    ],
    encounter_rate: 0.1,
    narrative_trigger: "The void speaks through this creature..."
  },
  {
    id: "ancient_guardian",
    creature: {
      species: "guardian",
      variant: "ancient",
      level: 70,
      genetic_markers: ['timeless', 'unbreakable']
    },
    spawn_conditions: [
      { type: 'achievement', value: 'temple_master', required: true },
      { type: 'item', value: 'ancient_key', required: true }
    ],
    encounter_rate: 100, // Guaranteed when conditions met
    one_time: true,
    narrative_trigger: "It has waited eons for a worthy trainer."
  }
]
```

## Implementation Roadmap

### Phase 1: Core Breeding (Week 1)
- [ ] Genetic model
- [ ] Basic breeding mechanics
- [ ] Egg system
- [ ] IV inheritance

### Phase 2: Variants (Week 2)
- [ ] Variant types
- [ ] Variant encounters
- [ ] Variant breeding rules
- [ ] Visual differentiation

### Phase 3: Collection (Week 3)
- [ ] Encyclopedia UI
- [ ] Progressive unlocks
- [ ] Lore system
- [ ] Achievement tracking

### Phase 4: Advanced Features (Week 4)
- [ ] Genetic markers
- [ ] Complex evolutions
- [ ] Rare encounters
- [ ] Collection rewards

## Balance Considerations

### Breeding Balance
- Egg steps: 2,560 - 10,240 based on species
- Compatible pair bonus: -25% steps
- Perfect IV inheritance: 3 guaranteed from parents
- Shiny chance: 1/4096 (Masuda method: 1/683)
- Mutation rate: 5% base, up to 20% with items

### Collection Balance
- Total species: 150 base + 50 variants
- Completion reward tiers: 25%, 50%, 75%, 90%, 100%
- Lore entries per species: 5-10
- Rare encounter window: 1% per 100 steps in correct conditions

### Progression Gates
- Breeding unlocked: After 2nd gym
- Variant encounters: After 3rd gym
- Fusion evolution: After 6th gym
- Paradox creatures: New Game+ only

---

*Breeding & Collection Specification Complete*  
*Next: Revised Project Brief*