# Dark Narrative System Design

## Core Concept: "The Fading"

A mysterious corruption spreading through the creature world, affecting both wild creatures and human settlements. Players must uncover the source while making moral choices that permanently affect the world state.

## Narrative Architecture

### Three-Pillar Story Structure

```typescript
interface NarrativeState {
  corruption: CorruptionLevel      // World decay: 0-100
  morality: MoralityAlignment      // Player choices: -100 to +100  
  revelation: RevelationProgress   // Truth uncovered: 0-100%
}

type CorruptionLevel = number // 0=Pure, 100=Consumed
type MoralityAlignment = number // -100=Shadow, 0=Neutral, 100=Light
type RevelationProgress = number // Knowledge of true threat
```

## Story Themes

### Central Themes
1. **Symbiosis vs Exploitation** - Are creatures partners or tools?
2. **Truth vs Comfort** - Uncovering painful truths about the world
3. **Sacrifice vs Preservation** - What will you give up to save others?
4. **Order vs Freedom** - Control creatures or let nature decide?

### Dark Elements (T-Rated)
- Creatures "fading" into shadows (not dying, but losing essence)
- Towns abandoned due to corruption
- NPCs with tragic backstories tied to their creatures
- Moral ambiguity - no purely good/evil choices
- Environmental decay reflecting player actions
- Disturbing creature lore entries

## Dynamic World System

### Corruption Mechanics

```typescript
interface AreaCorruption {
  areaId: string
  level: number // 0-100
  effects: CorruptionEffect[]
  faded_creatures: string[] // Species that disappeared
  corruption_events: WorldEvent[]
}

interface CorruptionEffect {
  type: 'visual' | 'mechanical' | 'narrative'
  description: string
  modifier: any
}

// Examples
const corruptionEffects = {
  0-25: {
    visual: "Slight purple tinge to shadows",
    mechanical: "5% chance corrupted creatures",
    narrative: "NPCs mention strange dreams"
  },
  26-50: {
    visual: "Dead vegetation, dark fog",
    mechanical: "25% corrupted encounters, -10% catch rate",
    narrative: "NPCs missing, notes left behind"
  },
  51-75: {
    visual: "Twisted terrain, shadow creatures",
    mechanical: "Shadow-type moves +20% power",
    narrative: "Ghost town, echoes of the past"
  },
  76-100: {
    visual: "Reality breaking, void zones",
    mechanical: "Can't heal here, corruption spreads to team",
    narrative: "Only corrupted creatures remain"
  }
}
```

### Morality System

```typescript
interface MoralChoice {
  id: string
  prompt: string
  options: ChoiceOption[]
  consequences: Consequence[]
  locks_path?: string[] // Permanent route changes
}

interface ChoiceOption {
  text: string
  morality_shift: number
  corruption_change: number
  unlocks?: string[] // New areas, creatures, story branches
}

// Example moral choice
const healOrHarvest: MoralChoice = {
  id: "fading_creature_encounter",
  prompt: "You find a Sprout fading into shadow. Its essence could strengthen your team, but you might be able to save it...",
  options: [
    {
      text: "Absorb its essence (+10 to all stats)",
      morality_shift: -20,
      corruption_change: +5,
      unlocks: ["shadow_evolution_path"]
    },
    {
      text: "Use rare medicine to save it",
      morality_shift: +15,
      corruption_change: -3,
      unlocks: ["pure_sprout_companion"]
    },
    {
      text: "End its suffering quickly",
      morality_shift: 0,
      corruption_change: +1,
      unlocks: ["mercy_killer_reputation"]
    }
  ]
}
```

## Story Progression System

### Act Structure

#### Act 1: Innocence (Levels 1-20)
- Traditional creature collection
- First signs of corruption
- Meet key NPCs with hidden agendas
- **Climax:** First town falls to corruption

#### Act 2: Revelation (Levels 20-40)  
- Corruption spreading faster
- Discover creatures can be "purified" or "embraced"
- Major moral choices affect world state
- **Climax:** Learn you might be the cause

#### Act 3: Consequence (Levels 40-60)
- World reflects your choices dramatically
- Former allies may become enemies
- Creature loyalty tested
- **Climax:** Face the true source of corruption

#### Postgame: Recursion
- New Game+ with retained knowledge
- World corruption carries over
- Hidden "True" ending available
- Paradox creatures appear

### Branching Paths

```typescript
interface StoryBranch {
  id: string
  required_morality: [number, number] // min, max
  required_corruption: [number, number]
  required_flags: string[]
  scenes: CutScene[]
  unlocks: UnlockContent
}

// Three main paths
const STORY_PATHS = {
  SHADOW_PATH: {
    // Embrace corruption, become the void
    required_morality: [-100, -30],
    ending: "VOID_SOVEREIGN",
    unique_creatures: ["Void_Sprout", "Shadow_Ember"],
    final_boss: "Your_Past_Self"
  },
  BALANCE_PATH: {
    // Seek equilibrium between light and dark
    required_morality: [-30, 30],
    ending: "GREY_GUARDIAN",
    unique_creatures: ["Twilight_Sprout", "Dusk_Ember"],
    final_boss: "The_First_Trainer"
  },
  PURE_PATH: {
    // Fight corruption at all costs
    required_morality: [30, 100],
    ending: "LIGHT_SACRIFICE",
    unique_creatures: ["Radiant_Sprout", "Solar_Ember"],
    final_boss: "Corrupted_Self"
  }
}
```

## Dialogue System

### Dynamic Dialogue

```typescript
interface DialogueNode {
  id: string
  speaker: NPC | 'PLAYER' | 'NARRATOR'
  text: string | ConditionalText[]
  emotion?: EmotionState
  choices?: DialogueChoice[]
  effects?: DialogueEffect[]
}

interface ConditionalText {
  condition: () => boolean
  text: string
}

// Example: NPC reacts to world state
const mayorDialogue: DialogueNode = {
  speaker: MAYOR,
  text: [
    {
      condition: () => corruption < 25,
      text: "Welcome, trainer! Our town thrives thanks to people like you."
    },
    {
      condition: () => corruption >= 25 && corruption < 50,
      text: "You... you're back. Have you seen what's happening to our town?"
    },
    {
      condition: () => corruption >= 50 && corruption < 75,
      text: "Why didn't you stop this when you could have?!"
    },
    {
      condition: () => corruption >= 75,
      text: "..." // Mayor is gone, only shadow remains
    }
  ]
}
```

### Lore Discovery

```typescript
interface LoreEntry {
  id: string
  title: string
  content: string
  unlock_condition: () => boolean
  corruption_level: number // How dark is this lore?
  links_to: string[] // Related entries
}

const loreDatabase: LoreEntry[] = [
  {
    id: "origin_of_bonding",
    title: "The First Bond",
    content: "Before humans arrived, creatures lived in perfect balance. The first trainer didn't capture creatures—they made a pact. In exchange for power, humans would protect the sacred sites. We broke that promise...",
    unlock_condition: () => player.badges >= 3,
    corruption_level: 40
  },
  {
    id: "the_fading_truth",
    title: "Why They Fade",
    content: "Creatures don't die—they fade back to the void from whence they came. But something is pulling them back faster now. Every battle weakens the veil...",
    unlock_condition: () => player.creatures_faded >= 10,
    corruption_level: 60
  }
]
```

## Environmental Storytelling

### Visual Narrative Cues

```typescript
interface EnvironmentalStory {
  trigger: LocationTrigger
  elements: StoryElement[]
  player_discovery: boolean
}

const abandonedGym: EnvironmentalStory = {
  trigger: { area: "gym_1", corruption: 50 },
  elements: [
    {
      type: "visual",
      description: "Scattered badges on the floor"
    },
    {
      type: "interactive",
      description: "Last journal entry: 'They're not obeying anymore...'"
    },
    {
      type: "battle",
      description: "Corrupted version of gym leader's signature creature"
    }
  ]
}
```

### Creature Behavioral Changes

```typescript
interface CreatureMood {
  loyalty: number // Affected by moral choices
  corruption: number // Individual corruption level
  trust_dialogue: string[]
  refuse_commands?: boolean // At low loyalty
  shadow_evolution?: boolean // At high corruption
}

// Creatures remember your choices
const creatureReactions = {
  after_harvest_essence: {
    loyalty: -20,
    dialogue: "Your Sprout seems afraid of you..."
  },
  after_save_fading: {
    loyalty: +15,
    dialogue: "Your Sprout nuzzles against you gratefully"
  },
  in_corrupted_area: {
    loyalty: -5,
    dialogue: "Your creatures huddle together nervously"
  }
}
```

## NPCs with Depth

### Recurring Characters

```typescript
interface NPC {
  id: string
  name: string
  role: string
  moral_alignment: number
  story_arc: NPCArc[]
  creature_team: Creature[]
  fate: NPCFate // Changes based on player choices
}

const KEY_NPCS = {
  RIVAL: {
    name: "Kai",
    role: "Mirror of player's choices",
    arc: [
      "Enthusiastic beginner",
      "Questioning the system",
      "Choosing opposite path from player",
      "Final confrontation or alliance"
    ],
    fate: {
      if_player_shadow: "Becomes light guardian",
      if_player_light: "Consumed by corruption",
      if_player_balance: "Finds own balance"
    }
  },
  PROFESSOR: {
    name: "Dr. Morrow",
    role: "Unreliable narrator",
    arc: [
      "Helpful mentor figure",
      "Hiding dark research",
      "Revealed as corruption source",
      "Redemption or damnation"
    ]
  },
  SHADOW_CHILD: {
    name: "Echo",
    role: "Corruption personified",
    arc: [
      "Appears in dreams",
      "Manifests in corrupted zones",
      "Reveals they were first trainer",
      "Final boss or saved soul"
    ]
  }
}
```

## Choice Consequences

### Immediate Effects
- Creature loyalty shifts
- NPC relationships change
- Area corruption levels adjust
- New dialogue options unlock

### Long-term Effects
- Story branches lock/unlock
- Creature evolution paths change
- Town prosperity/decay
- Ending availability

### Permanent Changes
- Creatures that fade never return
- NPCs who leave don't come back
- Corrupted areas can't be fully cleansed
- Some choices can't be undone

## Ending Matrix

```typescript
interface Ending {
  id: string
  requirements: EndingRequirements
  cutscene: string
  epilogue: string
  unlocks: string[]
}

const ENDINGS = {
  TRUE_ENDING: {
    requirements: {
      morality: [-10, 10],
      corruption: [40, 60],
      all_lore_discovered: true,
      no_creatures_faded: true,
      new_game_plus: true
    },
    epilogue: "You broke the cycle. Creatures and humans found a new way forward."
  },
  VOID_ENDING: {
    requirements: {
      morality: [-100, -50],
      corruption: [80, 100]
    },
    epilogue: "You became one with the void. Was this always your destiny?"
  },
  SACRIFICE_ENDING: {
    requirements: {
      morality: [50, 100],
      corruption: [0, 30]
    },
    epilogue: "Your light burned away the darkness, but at what cost?"
  },
  LOOP_ENDING: {
    requirements: {
      default: true // If no other ending matches
    },
    epilogue: "The cycle continues. Another trainer begins their journey..."
  }
}
```

## Implementation Priority

### Phase 1: Core Systems (Week 1)
- [ ] Morality tracking
- [ ] Corruption levels
- [ ] Basic dialogue conditions
- [ ] Choice recording

### Phase 2: World Reactivity (Week 2)
- [ ] Area corruption effects
- [ ] NPC relationship tracking
- [ ] Creature loyalty system
- [ ] Environmental changes

### Phase 3: Story Content (Week 3-4)
- [ ] Write main path dialogue
- [ ] Create moral choice scenarios
- [ ] Design corrupted variants
- [ ] Implement endings

### Phase 4: Polish (Week 5)
- [ ] Cutscene system
- [ ] Lore collectibles
- [ ] New Game+ mechanics
- [ ] Secret content

## Narrative Hooks

### Opening Hook
"They say creatures choose their trainers. But what if we chose wrong? What if every capture, every battle, tears the veil a little more? The fading has begun, and somehow... it's connected to you."

### Midpoint Twist
"The corruption isn't spreading FROM somewhere—it's spreading TO somewhere. Every faded creature is going home. The question is: should we stop them?"

### Final Revelation
"You're not the first trainer. You're the same trainer, caught in an endless loop. Each cycle, the world decays a little more. This time, can you break free?"

---

*Dark Narrative System Design Complete*  
*Next: Breeding & Collection Mechanics*