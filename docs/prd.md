# Shadow Chronicles Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Deliver a fully playable R-rated dark creature battle game with mature psychological horror themes
- Implement a moral corruption system where player choices permanently scar the world and creatures
- Create visceral combat with permadeath, dismemberment, and blood magic mechanics
- Build a disturbing narrative exploring symbiosis vs exploitation through body horror
- Ensure browser-based delivery for uncensored content outside app store restrictions
- Provide branching storylines based on moral decay and sanity collapse

### Background Context
This project creates a browser-based mature creature battle game inspired by psychological horror and dark RPGs, addressing the gap in the creature collection genre for adult audiences seeking meaningful consequences and disturbing themes. Moving beyond the family-friendly prototype, Shadow Chronicles embraces body horror, moral corruption, and permanent consequences. The LocalStorage foundation enables uncensored content delivery while avoiding platform restrictions, with future Supabase integration planned for cloud saves and community features.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-01-08 | 1.0 | Initial PRD creation with R-rated vision | PM Agent |

## Requirements

### Functional Requirements

**Dark Core Mechanics**
- FR1: Blood Bond System requires permanent HP sacrifice for creature evolution
- FR2: Corruption meter (0-100) mutates creatures and decays world based on player actions
- FR3: Permadeath system with graphic death animations when creatures reach 0 HP
- FR4: Essence extraction from living creatures via torture mechanics for power gains
- FR5: Body horror evolution where creatures physically merge with trainers
- FR6: Sanity system affects UI distortion and reality perception

**Combat Violence**
- FR7: Dismemberment targeting allows permanent limb removal affecting stats
- FR8: Blood magic uses creature/trainer blood as resource for forbidden moves
- FR9: Execution finishers trigger graphic kills below 10% HP
- FR10: Environmental gore persistence with blood stains remaining permanently
- FR11: Cannibalistic healing by consuming defeated creature corpses
- FR12: Berserk rage mode where creatures attack friend and foe

**World Corruption**
- FR13: NPCs can be permanently killed affecting story branches
- FR14: Plague mechanics spread disease from corrupted creatures to towns
- FR15: Desperation system triggers NPC/creature suicide events
- FR16: Forced breeding creates genetic abominations with high mortality
- FR17: Child trainers can be corrupted into dark servants
- FR18: Betrayal system allows creatures to permanently injure trainers

**Narrative Systems**
- FR19: Three-path morality system (Shadow/Balance/Light) with locked branches
- FR20: Dialogue changes based on corruption, sanity, and world state
- FR21: Environmental storytelling through corpses, blood, and decay
- FR22: Lore discovery revealing the cyclic nature of world destruction
- FR23: Multiple endings based on moral choices and corruption level
- FR24: New Game+ carries corruption into recursion loop

### Non-Functional Requirements

**Content Control**
- NFR1: Mandatory 18+ age verification gate
- NFR2: Detailed content warnings for violence, gore, psychological horror
- NFR3: Regional blocking for restricted jurisdictions
- NFR4: No ability to disable mature content below M-rating

**Performance**
- NFR5: 60fps with particle blood effects on 2020+ hardware
- NFR6: Gore state persistence under 50MB storage
- NFR7: Instant combat response for visceral feedback
- NFR8: Psychological shader effects for sanity distortion

**Atmosphere**
- NFR9: Disturbing creature vocalizations and pain sounds
- NFR10: Dynamic psychological horror soundscape
- NFR11: Persistent environmental decay rendering
- NFR12: Grotesque creature designs with body horror elements

## User Interface Design Goals

### Overall UX Vision
Create an oppressive, disturbing interface that degrades with corruption. UI elements should feel uncomfortable, with blood splatters obscuring information, text becoming illegible during sanity breaks, and menu options literally dying/corrupting. The Game Boy aesthetic transforms into a broken, bleeding CRT monitor effect with static, distortion, and psychological glitches.

### Key Interaction Paradigms
- **Visceral Feedback**: Every action has weight - blood splatters on button presses
- **Unreliable Interface**: UI lies to player during low sanity states
- **Permanent Consequences**: No undo, no confirmation dialogs for dark choices
- **Gesture Violence**: Swipe gestures for dismemberment, hold for torture
- **Corruption Spreading**: UI elements decay based on moral choices

### Core Screens and Views
- **Title Screen**: Mass grave of previous players, must dig out to start
- **Battle Arena**: Blood-soaked combat zone with corpse obstacles
- **Breeding Pit**: Disturbing facility with cages and surgical equipment
- **Corruption Map**: World map showing decay spread in real-time
- **Sanity Break**: Distorted reality with multiple false interfaces
- **Death Gallery**: Memorial of all permanently dead creatures/NPCs
- **Moral Crossroads**: Choice scenes with no good options

### Accessibility: Limited Support
While maintaining disturbing themes, provide:
- Colorblind mode for blood visibility
- Subtitle options for screams/dialogue
- Reduced motion for psychological effects (but never fully disabled)

### Branding
- **Color Palette**: Deep reds, sick greens, void blacks, bone whites
- **Typography**: Corrupted pixel fonts that degrade over time
- **Logo**: Creature skull with human teeth
- **Audio Identity**: Discordant chiptunes mixed with realistic screams

### Target Device and Platforms: Desktop-First Web
- Primary: Desktop browsers (uncensored content)
- Secondary: Mobile web (with performance warnings)
- Excluded: App stores (will not pass certification)
- Distribution: Own hosting, itch.io, adult gaming platforms

## Technical Assumptions

### Repository Structure: Monorepo
Single repository containing game client, asset pipeline, and future Supabase integration

### Service Architecture
**Initial**: Frontend-only with LocalStorage for immediate dark prototype
**Phase 2**: Supabase backend for cloud saves, leaderboards, creature trading
**Future**: Real-time multiplayer battles with gore synchronization

### Testing Requirements
- Unit tests for combat mathematics and corruption formulas
- Integration tests for moral choice consequences
- Manual testing for psychological impact and trigger warnings
- Community beta for content boundaries and balance

### Additional Technical Assumptions and Requests
- WebGL 2.0 for advanced gore shaders and particle systems
- IndexedDB for large gore state and corpse persistence
- Web Audio API for layered screaming and psychological effects
- Service Worker for offline play and background corruption
- Canvas API for blood splatter physics
- Compression for gore texture optimization
- Adult content CDN for uncensored asset delivery
- Age verification service integration
- ESRB/PEGI rating system compliance
- Legal review for content liability

## Epic List

### Epic Structure for Dark Game

**Epic 1: Foundation & Dark Core**
Establish project infrastructure with age gate, implement base combat with blood effects, create first 3 horrific creatures

**Epic 2: Corruption Systems**
Build moral choice framework, implement world decay mechanics, add sanity/psychological systems

**Epic 3: Violence & Gore Enhancement** 
Add dismemberment system, implement execution finishers, create blood magic mechanics

**Epic 4: Narrative Horror**
Implement branching dark storylines, create disturbing NPCs, add environmental storytelling

**Epic 5: Breeding Horror & Collection**
Build forced breeding mechanics, implement creature fusion/abominations, add permadeath gallery

**Epic 6: World Corruption**
Create plague spreading system, implement NPC permadeath, add town decay mechanics

**Epic 7: Endgame & Recursion**
Multiple ending implementations, New Game+ with corruption carry-over, true ending secrets

### Rationale for Epic Structure
- **Epic 1** establishes dark tone immediately while building technical foundation
- **Progression** moves from core violence to systemic horror to narrative payoff
- **Each epic** delivers a complete, disturbing feature set that stands alone
- **Testing windows** between epics allow for psychological impact assessment
- **Backend integration** delayed until core dark mechanics proven engaging

**Questions for refinement:**
1. Should we add a "Multiplayer Arena" epic for PvP creature torture?
2. Do we need a separate "Mod Support" epic for community horror content?
3. Should psychological counseling resources be built into the game epic?

---

**Next: Epic Details Section (Interactive)**

1. **Proceed to next section**
2. **Expand or Contract for Audience** - Adjust detail level
3. **Explain Reasoning (CoT Step-by-Step)** - Show thinking process
4. **Critique and Refine** - Review for improvements
5. **Analyze Logical Flow and Dependencies** - Check consistency
6. **Assess Alignment with Overall Goals** - Verify goal fit
7. **Identify Potential Risks and Unforeseen Issues** - Find risks
8. **Challenge from Critical Perspective** - Devil's advocate
9. **Tree of Thoughts Deep Dive** - Explore solution paths

## Epic 1: Foundation & Dark Core

### Epic Goal
Establish the technical foundation and age-gated infrastructure while introducing players to the dark world through visceral combat, blood bonding mechanics, and the first glimpse of body horror that sets the mature tone for the entire experience.

### Story 1.1: Project Infrastructure & Age Gate

**As a** developer  
**I want** foundational project setup with mature content gating  
**So that** we have a legally compliant R-rated game foundation

**Acceptance Criteria:**
1. Vite + React + TypeScript project with strict mode configured
2. Age verification gate requiring birthdate entry (18+ only)
3. Detailed content warning screen listing all mature themes
4. LocalStorage for age verification persistence (24-hour cache)
5. Regional blocking logic for restricted jurisdictions
6. Legal disclaimer and terms of service acceptance
7. Tailwind configured with dark horror theme variables
8. Git repository with .gitignore for sensitive content
9. Environment variables for adult CDN configuration
10. Browser compatibility check for WebGL 2.0 and required APIs

### Story 1.2: Dark UI System & Horror Aesthetics

**As a** player  
**I want** a disturbing, oppressive interface  
**So that** I immediately understand this isn't a children's game

**Acceptance Criteria:**
1. Corrupted Game Boy aesthetic with CRT distortion effects
2. Blood splatter particle system for UI interactions
3. Menu components with decay animations over time
4. Psychological glitch shaders for low sanity states
5. Gore-appropriate color palette (deep reds, sick greens, void blacks)
6. Disturbing font system that degrades with corruption
7. UI sound effects (wet clicks, bone cracks, whispers)
8. Screen shake and distortion on violent actions
9. Blood drop cursor with trail effects
10. Warning indicators for permanent consequences

### Story 1.3: Combat Engine with Blood Physics

**As a** player  
**I want** visceral, violent combat with permanent consequences  
**So that** battles feel dangerous and meaningful

**Acceptance Criteria:**
1. Turn-based combat with real-time blood particle effects
2. HP system with permanent max HP reduction mechanics
3. Blood pool accumulation that affects movement
4. Damage numbers that splatter like blood
5. Critical hits trigger slow-motion gore effects
6. Miss attacks still cause psychological damage (fear buildup)
7. Combat log written in increasingly frantic text
8. Creature pain vocalizations and screaming
9. Camera shake intensity based on damage dealt
10. Victory screen shows creature corpses, not fainting

### Story 1.4: First Three Abomination Creatures

**As a** player  
**I want** disturbing starter creatures that embody horror  
**So that** I form uncomfortable bonds with monsters

**Acceptance Criteria:**
1. Corrupted Sprout: Plant creature with human teeth and eyes
2. Burning Child: Fire creature that screams when attacking  
3. Drowned Pup: Water creature that leaks black fluid
4. Each creature has disturbing idle animations (twitching, crying)
5. Unique death animations with appropriate gore
6. Lore entries revealing tragic origins
7. Stats affected by moral alignment (fear vs loyalty)
8. Disturbing evolution hints (body merger preview)
9. Creature cries change based on health/sanity
10. Bonding requires blood sacrifice mini-game

### Story 1.5: Blood Bond System

**As a** player  
**I want** to form blood pacts with creatures  
**So that** our connection requires sacrifice

**Acceptance Criteria:**
1. Initial bonding requires cutting scene (player or creature)
2. Permanent HP transfer between trainer and creature
3. Shared pain system (damage to one affects other)
4. Blood meter that enables powerful attacks when filled
5. Withdrawal symptoms when creatures are apart too long
6. Visual blood connection during battles
7. Betrayal possibility if blood debt unpaid
8. Scarring system showing bond history on models
9. Blood type compatibility affects bond strength
10. Death of bonded creature causes permanent trainer damage

### Story 1.6: Save System with Corruption Persistence

**As a** player  
**I want** my dark choices permanently saved  
**So that** I live with the consequences

**Acceptance Criteria:**
1. LocalStorage save with encryption for gore states
2. No multiple save slots initially (one timeline)
3. Auto-save after every death or moral choice
4. Corruption level persists across sessions
5. Dead creatures stored in memorial database
6. Environmental blood/damage states saved
7. NPC death flags permanently recorded
8. Save corruption shows data decay over time
9. Export save as "confession" text file
10. Import detection prevents save scumming

## Epic 2: Corruption Systems

### Epic Goal
Implement the moral corruption framework that tracks player choices, mutates the world based on actions, and introduces psychological horror through sanity mechanics, creating a responsive world that remembers and punishes.

### Story 2.1: Moral Choice Framework

**As a** player  
**I want** my decisions to have permanent consequences  
**So that** every choice carries moral weight

**Acceptance Criteria:**
1. Morality scale from -100 (pure evil) to +100 (false light)
2. Choice UI that shows no "good" options, only lesser evils
3. Immediate feedback showing morality shift with blood effects
4. Choices lock/unlock future story branches permanently
5. No choice reversal or undo mechanics
6. Timer pressure on critical decisions (choose or it chooses for you)
7. Moral choices affect creature loyalty and behavior
8. Visual corruption of UI elements based on moral level
9. Choice history log written like confessions
10. Achievements for extreme moral positions

### Story 2.2: World Decay Mechanics

**As a** player  
**I want** the world to visually rot based on my actions  
**So that** I see the physical manifestation of my choices

**Acceptance Criteria:**
1. Corruption spreads from player's path like infection
2. Grass dies and turns black where battles occurred
3. Water sources become blood when corrupted creatures die nearby
4. Buildings develop cracks and bleeding walls over time
5. NPCs show physical decay (missing eyes, rotting skin)
6. Sky color shifts from blue to red to void black
7. Environmental sounds change (birds to screams)
8. Corrupted areas spawn shadow creatures
9. Clean areas become increasingly rare
10. Irreversible world state changes

### Story 2.3: Sanity System Implementation

**As a** player  
**I want** psychological consequences for witnessing horror  
**So that** my mental state affects gameplay

**Acceptance Criteria:**
1. Sanity meter (100 to 0) that never fully recovers
2. Low sanity causes UI hallucinations and false information
3. Text becomes illegible or changes meaning randomly
4. Fake creatures appear in battles that aren't real
5. Controls occasionally reverse or stop responding
6. Menu options lead to wrong screens
7. False save notifications that didn't actually save
8. Whisper audio tracks layered over gameplay
9. Screen fractures like broken glass at critical sanity
10. Complete break triggers special "madness" ending

### Story 2.4: Creature Corruption Mutations

**As a** player  
**I want** my creatures to physically change based on moral choices  
**So that** they become reflections of my darkness

**Acceptance Criteria:**
1. Visual corruption stages (0%, 25%, 50%, 75%, 100%)
2. Extra limbs or eyes growing at corruption milestones
3. Original colors drain to grey/black over time
4. Abilities transform into cruel versions (Heal becomes Drain)
5. Corrupted creatures gain violence bonus, lose defense
6. Permanent scarring from each battle survived
7. Size increases but mobility decreases with corruption
8. Vocalizations change from cries to growls to screams
9. Full corruption triggers irreversible "void form"
10. Pure creatures become hostile to corrupted ones

### Story 2.5: NPC Relationship Decay

**As a** player  
**I want** NPCs to remember and react to my evil  
**So that** I become increasingly isolated

**Acceptance Criteria:**
1. Reputation system tracked per NPC and per town
2. NPCs flee when player approaches at high corruption
3. Shop prices increase based on fear level
4. Former allies become boss battles
5. Children NPCs disappear first from corrupted towns
6. Dialogue options become increasingly hostile
7. NPCs form mobs to attack player at extreme corruption
8. Betrayal options for every friendly NPC
9. Permanent rivalry system with escalating vengeance
10. Towns can bar entry or set bounties on player

### Story 2.6: Corruption Save Branching

**As a** player  
**I want** different save paths based on corruption level  
**So that** I can explore different moral routes

**Acceptance Criteria:**
1. Three save slots with visual corruption preview
2. Each slot tracks different moral path
3. Corruption bleeds between saves slightly (meta-horror)
4. Comparison screen showing divergence points
5. Locked content based on other slot choices
6. True ending requires all three paths explored
7. Save file names change based on moral state
8. Export saves with corruption analysis
9. Cloud backup warns about moral content
10. New Game+ combines all corruption into nightmare mode