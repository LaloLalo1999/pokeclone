# Shadow Chronicles Product Requirements Document (PRD) - Complete Version

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

## Epic 1: Foundation & Dark Core

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
2. Scorched Wraith: Fire creature that screams when attacking  
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

## Epic 3: Violence & Gore Enhancement

### Story 3.1: Dismemberment Combat System
**As a** player  
**I want** to target and remove creature limbs  
**So that** battles have permanent physical consequences

**Acceptance Criteria:**
1. Body part targeting (head, limbs, wings, tail)
2. Limb HP separate from creature total HP
3. Severed parts remain on battlefield as obstacles
4. Movement/stats permanently reduced by missing limbs
5. Phantom limb pain causes random attack failures
6. Crude prosthetics available at black market shops
7. Severed parts can be collected as crafting materials
8. Regeneration moves only work at terrible cost
9. Critical dismemberment causes instant permadeath
10. Dismemberment animations with bone/sinew details

### Story 3.2: Execution Finisher Moves
**As a** player  
**I want** brutal finishing moves for low-HP enemies  
**So that** victory feels visceral and final

**Acceptance Criteria:**
1. Execution prompt at enemy <10% HP
2. Quick-time events for more brutal finishers
3. Creature-specific execution animations
4. Blood explosion effects covering screen
5. Permanent fear infliction on watching creatures
6. Execution chains for multiple low-HP enemies
7. Morality loss for unnecessary executions
8. Trophy system from executed creatures
9. Execution immunity for story-critical battles
10. Finishing move gallery for viewing deaths

### Story 3.3: Blood Magic Resource System
**As a** player  
**I want** to use blood as a resource for power  
**So that** strength requires sacrifice

**Acceptance Criteria:**
1. Blood points gained from damage dealt/received
2. Blood bank storage between battles (coagulation over time)
3. Powerful moves cost blood instead of PP
4. Self-harm options to generate blood quickly
5. Blood transfusion between creatures at permanent cost
6. Blood types affect magic compatibility
7. Corrupted blood causes random negative effects
8. Blood rituals for permanent stat boosts
9. Vampiric abilities drain blood from opponents
10. Maximum blood storage increases with corruption

### Story 3.4: Environmental Gore Persistence
**As a** player  
**I want** battle violence to permanently mark locations  
**So that** the world remembers every fight

**Acceptance Criteria:**
1. Blood splatters remain forever on terrain
2. Corpses decay realistically over game days
3. Bone piles accumulate in frequent battle zones
4. Grass won't regrow where blood was spilled
5. Water sources turn red after nearby battles
6. Scavenger creatures appear to feed on remains
7. Gore attracts more violent wild encounters
8. Clean zones become increasingly valuable
9. Environmental storytelling through old battlefields
10. Memorial markers appear for significant deaths

### Story 3.5: Cannibalistic Mechanics
**As a** player  
**I want** to consume defeated creatures for power  
**So that** survival requires moral compromise

**Acceptance Criteria:**
1. Devour option appears for defeated creatures
2. Immediate HP restoration based on creature level
3. Chance to gain one ability from consumed creature
4. Cannibalism increases corruption significantly
5. Prion disease risk with repeated consumption
6. Team morale decreases witnessing cannibalism
7. Special evolutions unlocked through consumption
8. Taste preferences develop affecting bonuses
9. Starvation mechanics if not feeding regularly
10. Wendigo transformation at extreme consumption

## Epic 4: Narrative Horror

### Story 4.1: Branching Dark Storylines
**As a** player  
**I want** my choices to create unique story paths  
**So that** each playthrough reveals different horrors

**Acceptance Criteria:**
1. Three main paths: Shadow (evil), Balance (grey), Light (martyrdom)
2. Point of no return clearly marked for each branch
3. Mutually exclusive story events based on path
4. Different NPCs ally/oppose based on alignment
5. Unique areas accessible only on specific paths
6. Path-specific creatures and evolution lines
7. Dialogue completely changes based on route
8. Different final boss for each path
9. Journal updates tracking path divergence
10. New Game+ reveals path connections

### Story 4.2: Disturbing NPC Creation
**As a** player  
**I want** memorable NPCs with dark histories  
**So that** every interaction feels meaningful

**Acceptance Criteria:**
1. 20+ unique NPCs with tragic backstories
2. Procedural scarring/decay based on world state
3. Relationship meters that can go negative
4. Betrayal flags for every friendly NPC
5. Adult NPCs that can be corrupted
6. Insane NPCs that give false information
7. Ghost NPCs from previous game loops
8. NPCs remember player actions across encounters
9. Suicide events for desperate NPCs
10. NPC creatures reflect owner's mental state

### Story 4.3: Environmental Storytelling System
**As a** player  
**I want** the world to tell stories through decay  
**So that** exploration reveals hidden narratives

**Acceptance Criteria:**
1. Abandoned areas with evidence of struggle
2. Diary pages scattered revealing town history
3. Corpse positioning tells story of death
4. Graffiti messages warning about player
5. Creature nests built from human remains
6. Children's toys in mass grave sites
7. Progressive decay showing timeline of events
8. Audio logs from deceased trainers
9. Environmental puzzles revealing dark truths
10. Hidden rooms with disturbing discoveries

### Story 4.4: The Fading Mystery
**As a** player  
**I want** to uncover why creatures are vanishing  
**So that** the truth becomes more horrible than ignorance

**Acceptance Criteria:**
1. Creatures randomly vanish during gameplay
2. Void zones where creatures disappeared
3. Investigation mechanics for gathering clues
4. Research notes from missing professors
5. Pattern recognition in disappearances
6. Connection between player actions and fading
7. Revelation that player caused the fading
8. Time loop evidence in environment
9. Previous player corpses are yourself
10. Truth locks player into tragic ending

### Story 4.5: Multiple Ending Implementation
**As a** player  
**I want** different endings based on my choices  
**So that** my journey determines my fate

**Acceptance Criteria:**
1. 5 main endings + 3 secret endings
2. Ending determined by morality/corruption/sanity
3. Point of no return warning before ending lock
4. Unique cutscenes for each ending
5. Epilogue showing world state after ending
6. Character fates revealed based on choices
7. New Game+ unlocked with ending bonus
8. Achievement system for ending collection
9. True ending requires all paths complete
10. Credits roll over appropriate imagery

## Epic 5: Breeding Horror & Collection

### Story 5.1: Forced Breeding Facility
**As a** player  
**I want** to breed creatures against their will  
**So that** I create powerful abominations through suffering

**Acceptance Criteria:**
1. Breeding pit facility with cages and restraints
2. Creatures show fear/resistance when selected for breeding
3. Compatibility matrix creating higher mortality with forced pairs
4. Breeding causes permanent trauma to parent creatures
5. 60% offspring die immediately (shown graphically)
6. Surviving offspring have random deformities
7. Incest breeding creates powerful but unstable variants
8. Parents may attack or eat malformed offspring
9. Screaming audio during breeding process
10. Blood and fluids remain in breeding area

### Story 5.2: Genetic Abomination System
**As a** player  
**I want** to create increasingly horrific hybrids  
**So that** I push the boundaries of natural law

**Acceptance Criteria:**
1. Multi-species breeding creating chimeras
2. Body parts randomly distributed (eyes on legs, mouths on back)
3. Chronic pain status permanent on all hybrids
4. Life expectancy tracker showing shortened lifespan
5. Random organ failure during battles
6. Hybrid-specific moves like "Agonized Wail" and "Flesh Rend"
7. Cannot be released, only euthanized
8. Unique death animations for each deformity type
9. Suffering increases power but decreases control
10. Maximum 3 generations before complete genetic collapse

### Story 5.3: Creature Fusion Ritual
**As a** player  
**I want** to permanently merge creatures together  
**So that** I create singular entities from multiple souls

**Acceptance Criteria:**
1. Ritual circle requiring creature sacrifice
2. Fusion process shows creatures melting together
3. Consciousness merger causes identity crisis
4. Multiple heads may argue with each other
5. Shared pain across all merged parts
6. Unstable fusion can split mid-battle (both die)
7. Memory fragments from all components remain
8. Exponential stat growth but control decreases
9. Cannot unfuse - permanent amalgamation
10. Fusion screams use multiple voice layers

### Story 5.4: Trophy Collection System
**As a** player  
**I want** to collect parts from defeated creatures  
**So that** I build a museum of my atrocities

**Acceptance Criteria:**
1. Taxidermy room displaying corpses
2. Organ jars with preserved specimens
3. Skull collection with name plates
4. Skin pelts used as decorative items
5. Interactive trophy examination with lore
6. Rare creature parts unlock special crafting
7. Living trophies in permanent agony
8. Trophy decay over time unless preserved
9. Visitors react with horror to collection
10. Complete sets unlock nightmare variants

### Story 5.5: Extinction Tracking
**As a** player  
**I want** to track species I've made extinct  
**So that** I see the permanence of my genocide

**Acceptance Criteria:**
1. Species counter showing remaining population
2. Last member of species has unique dialogue
3. Extinction event plays special cutscene
4. Ghost variants appear after extinction
5. Ecosystem collapse from missing species
6. Extinction monuments appear in world
7. Other trainers hunt player as eco-terrorist
8. Cannot breed extinct species back
9. New Game+ remembers extinctions
10. True ending requires 100% extinction

## Epic 6: World Corruption

### Story 6.1: Plague Spreading Mechanics
**As a** player  
**I want** my corrupted creatures to spread disease  
**So that** entire regions fall to pestilence

**Acceptance Criteria:**
1. Corruption becomes contagious after threshold
2. NPCs show symptoms (boils, bleeding, madness)
3. Town infection rates tracked visually
4. Quarantine zones established (then fail)
5. Mass grave sites appear outside towns
6. Infected NPCs become hostile zombies
7. Medicine becomes scarce black market item
8. Player immune but carries disease
9. Pets and wild creatures die en masse
10. Plague mutations create new horror variants

### Story 6.2: Town Collapse System
**As a** player  
**I want** to watch civilizations crumble  
**So that** I witness societal breakdown

**Acceptance Criteria:**
1. Economic collapse from trainer deaths
2. Food shortages lead to cannibalism
3. Law enforcement becomes lynch mobs
4. Religious extremism and creature sacrifices
5. Desperate recruitment of young soldiers
6. Public executions of suspected player allies
7. Buildings progressively abandoned then burned
8. Graffiti messages becoming increasingly desperate
9. Final survivors leave suicide notes
10. Ghost towns have unique terror encounters

### Story 6.3: NPC Suicide Events
**As a** player  
**I want** NPCs to break from despair  
**So that** my presence drives people to end themselves

**Acceptance Criteria:**
1. Depression meter for each NPC
2. Trigger warnings before suicide scenes
3. Methods vary based on NPC type
4. Suicide notes blame player directly
5. Family members react to losses
6. Cluster suicide events in corrupted areas
7. Failed attempts leave NPCs disfigured
8. Adult NPCs "disappear" (implied dark fate)
9. Creature partners die with their trainers
10. Ghosts of suicides haunt player

### Story 6.4: War Crime Systems
**As a** player  
**I want** to commit atrocities against populations  
**So that** I become history's greatest monster

**Acceptance Criteria:**
1. Poison water supplies killing hundreds
2. Burn occupied buildings with families inside
3. Use creatures to torture information from NPCs
4. Force creatures to attack their trainers
5. Biological warfare using infected creatures
6. Destroy food supplies causing starvation
7. Psychological warfare through displayed corpses
8. Enslave defeated trainers as forced breeders
9. War tribunal events where player is hunted
10. Genocide achievement for eliminating groups

### Story 6.5: Cult Formation
**As a** player  
**I want** followers who worship my darkness  
**So that** others participate in atrocities

**Acceptance Criteria:**
1. Broken NPCs become devotees
2. Cult rituals requiring virgin sacrifices
3. Adults indoctrinated into violence
4. Mass suicide pacts for ascension
5. Breeding programs for perfect vessels
6. Cannibalistic communion ceremonies
7. Self-mutilation for player approval
8. Betrayal of family for cult loyalty
9. Terrorist attacks on remaining pure towns
10. Final ritual summoning void entities

## Epic 7: Endgame & Recursion

### Story 7.1: Multiple Ending Implementations
**As a** player  
**I want** different flavors of damnation  
**So that** every path leads to horror

**Acceptance Criteria:**
1. Void Sovereign: Become the darkness, consume reality
2. Genocide Complete: Last living thing in dead world
3. Puppet Master: Control all survivors as mindless slaves
4. Flesh Cathedral: Merge with all creatures into one entity
5. Time Loop: Realize you've done this infinite times
6. Nuclear Winter: Destroy world to stop corruption
7. Became Monster: Transform into ultimate creature
8. Hell Portal: Open gateway, demons pour through
9. Suicide Ending: Only escape is player's death
10. No ending: Game continues forever in empty world

### Story 7.2: New Game+ Horror
**As a** player  
**I want** my sins to compound across loops  
**So that** each playthrough becomes worse

**Acceptance Criteria:**
1. Previous run's corpses litter world
2. NPCs remember past loop traumas
3. Creatures born pre-corrupted
4. Starting area already showing decay
5. Dialogue references previous atrocities
6. Photos of past runs in abandoned homes
7. Grave markers with player's name
8. Time distortions showing future horrors
9. Sanity starts lower each loop
10. Eventually born as creature, not human

### Story 7.3: True Ending Requirements
**As a** player  
**I want** the truth to be worse than ignorance  
**So that** revelation brings only despair

**Acceptance Criteria:**
1. Collect all 666 lore fragments
2. Complete all three moral paths
3. Witness every NPC death
4. Cause every possible extinction
5. Max corruption in all regions
6. Breed ultimate abomination
7. Betray every possible ally
8. Solve the void puzzle
9. Die 100 times across runs
10. Input real name for final choice

### Story 7.4: Post-Game Void Realm
**As a** player  
**I want** to explore after world's end  
**So that** I see the consequences eternally

**Acceptance Criteria:**
1. Empty world with no life remaining
2. Echoes of past events replay randomly
3. Shadow versions of dead creatures appear
4. Cannot save, only wander forever
5. UI gradually disappears completely
6. Controls slowly stop responding
7. Screen dims over hours of play
8. Whispers of dead NPCs increase
9. Player avatar decays visually
10. Final black screen with breathing sounds

### Story 7.5: Meta-Horror Integration
**As a** player  
**I want** the game to acknowledge my monstrosity  
**So that** the fourth wall breaks completely

**Acceptance Criteria:**
1. Save files renamed to "murderer_001"
2. Achievement notifications become accusations
3. Main menu shows player crime statistics
4. Loading screens display victim names
5. Game refuses to close normally
6. Desktop wallpaper changed to game imagery
7. Browser history shows "help me" searches
8. System notifications from dead NPCs
9. Save corruption affects other games
10. Uninstall message: "You can't escape what you've done"

## Checklist Results Report

✅ **Goals clearly defined** - R-rated horror game with permanent consequences  
✅ **Requirements comprehensive** - Full violence, gore, psychological systems  
✅ **Technical assumptions stated** - Browser limits, WebGL needs, legal requirements  
✅ **Epics sequentially logical** - Foundation → Systems → Content → Conclusion  
✅ **Stories independently completable** - Each delivers specific horror feature  
⚠️ **Legal review needed** - Extreme content requires legal consultation  
⚠️ **Platform strategy unclear** - Likely limited to itch.io and self-hosting  
✅ **Scope defined** - 7 epics, 35 stories, unrated content  
⚠️ **Team wellbeing unaddressed** - Creating this content will be psychologically taxing  
✅ **Player agency maximized** - Every choice matters and destroys  

## Next Steps

### UX Expert Prompt
"Review the attached PRD for an unrated horror creature collection game. Design UI that induces dread, uses psychological principles to unsettle players, and degrades based on moral corruption. Focus on making players feel complicit in atrocities through interface design."

### Architect Prompt  
"Architect a browser-based horror game from the attached PRD. Design systems for persistent gore states, blood physics, dismemberment mechanics, and psychological effects. Optimize for WebGL 2.0 while maintaining 60fps with hundreds of persistent corpses. Architecture must support future Supabase integration for cloud saves."

---

**Document Status: Complete**
**Total Epics: 7**
**Total Stories: 35**
**Estimated Development Time: 6-9 months with dedicated team**
**Content Rating: Unrated/Adults Only**
**Platform Strategy: Self-hosted or adult gaming platforms only**