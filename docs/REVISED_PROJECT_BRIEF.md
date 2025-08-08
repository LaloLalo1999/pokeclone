# Revised Project Brief: Shadow Chronicles

## Executive Summary

**Project Name:** Shadow Chronicles (formerly Pokeclone)  
**Genre:** Dark Narrative Creature Collection RPG  
**Platform:** Desktop-first Progressive Web App  
**Target Audience:** 16-35 year-olds seeking depth in creature collectors  
**USP:** Moral choices affect creature evolution and world state permanently

## Vision Statement

"Create a creature collection game where every choice matters, the world remembers your actions, and the line between saving and corrupting becomes increasingly blurred."

## Project Pivot Summary

### From (Original Vision)
- Simple GB-style nostalgia game
- LocalStorage-only persistence  
- Basic creature battling
- Casual difficulty
- Mobile-friendly quick sessions

### To (Revised Vision)
- Modern dark narrative RPG with retro influences
- Cloud-based progression with Supabase
- Deep breeding and collection mechanics
- Challenging, Dark Souls-inspired difficulty
- Desktop-optimized extended play sessions

## Core Pillars

### 1. Narrative Depth
- **The Fading:** Central mystery driving all gameplay
- **Moral Weight:** Every choice permanently affects the world
- **Environmental Storytelling:** World shows consequences visually
- **Multiple Endings:** Based on corruption/morality alignment

### 2. Collection Complexity
- **200+ Creatures:** 150 base + 50 variants
- **Breeding System:** Genetic inheritance and mutations
- **Progressive Encyclopedia:** Lore unlocked through gameplay
- **Variant Discovery:** Shadow, Pure, Twilight, Void forms

### 3. Strategic Combat
- **No Easy Mode:** Balanced for strategic thinking
- **Type Mastery:** 18 types with complex interactions
- **Corruption Mechanics:** Risk/reward in battle
- **Team Synergy:** Abilities and moves that combo

### 4. Player Agency
- **Cloud Saves:** Progress anywhere via Supabase
- **Import/Export:** Share saves and creatures
- **New Game+:** Carry knowledge into recursion
- **Living World:** NPCs remember and react

## Technical Architecture

### Stack Evolution
```
Frontend:
- React 19 + TypeScript 5
- Vite 7 + Tailwind CSS
- Zustand (state management)
- React Query (data fetching)
- Framer Motion (animations)

Backend:
- Supabase (auth, database, storage)
- PostgreSQL (relational data)
- Row-level security
- Real-time subscriptions

Testing:
- Vitest + Testing Library
- Playwright (E2E)
- 80% coverage target
```

### Data Architecture
```typescript
// Core entities now cloud-based
interface CloudGameState {
  user_id: UUID
  save_slots: SaveSlot[] // 3 slots
  achievements: Achievement[]
  global_stats: PlayerStats
  creature_bank: Creature[] // Shared storage
}

interface SaveSlot {
  id: UUID
  slot_number: 1 | 2 | 3
  game_state: GameState
  play_time: number
  last_saved: timestamp
  thumbnail: TeamPreview
  corruption_level: number
  morality_alignment: number
}
```

## Feature Roadmap

### MVP (Month 1-2)
**Goal:** Playable vertical slice with core loop

- [x] Basic battle engine
- [ ] 20 creatures with variants
- [ ] Cloud save system
- [ ] 3 areas with corruption
- [ ] Moral choice system
- [ ] Basic breeding
- [ ] Dark narrative intro

### Beta (Month 3-4)
**Goal:** Content-complete, needs polish

- [ ] 100+ creatures
- [ ] 8 gym leaders
- [ ] Full narrative arc
- [ ] Advanced breeding
- [ ] Encyclopedia system
- [ ] Achievement tracking
- [ ] Import/export saves

### Launch (Month 5-6)
**Goal:** Polished, complete experience

- [ ] 150+ creatures
- [ ] All variants implemented
- [ ] 3 endings complete
- [ ] New Game+ mode
- [ ] Performance optimized
- [ ] Community features
- [ ] Mod support framework

### Post-Launch
- Paradox creatures (NG+ exclusive)
- Seasonal events
- Community challenges
- Additional story chapters
- PvP battle simulator
- Creature trading hub

## Success Metrics

### Technical KPIs
- Page load: <2 seconds
- Frame rate: 60 FPS stable
- Save sync: <500ms
- Zero data loss incidents
- 99.9% uptime

### Gameplay KPIs
- Average session: 45+ minutes
- Retention D7: 40%
- Completion rate: 15%
- NG+ starts: 30% of completions
- Achievement unlock rate: 60%

### Business KPIs
- Monthly Active Users: 10,000 (Year 1)
- GitHub stars: 1,000+
- Discord community: 500+ members
- Portfolio impact: 3+ job interviews
- Open source contributors: 20+

## Risk Analysis

### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Supabase limits | Low | High | Monitor usage, upgrade tier if needed |
| Save corruption | Low | Critical | Multiple backups, validation |
| Performance issues | Medium | Medium | Profiling, lazy loading |
| Browser compatibility | Low | Low | Target modern browsers only |

### Design Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Too complex | Medium | High | Extensive playtesting |
| Too dark | Low | Medium | T-rating guidelines |
| Grinding required | Medium | Medium | XP scaling, catch-up mechanics |
| Unclear progression | Low | High | Tutorial, quest log |

## Competitive Analysis

### Direct Competitors
- **Pokemon ROM Hacks:** Free, established community
- **Temtem:** MMO focus, commercial
- **Coromon:** Modern pixel art, commercial
- **Pokemon Showdown:** Pure competitive, web-based

### Differentiation
- **Narrative Focus:** Choices matter more than stats
- **Dark Themes:** Unique in creature collector space
- **Breeding Depth:** Genetic system rivals main series
- **Free & Open Source:** No paywall, community-driven
- **Desktop-First:** Keyboard controls, larger viewport

## Marketing Strategy

### Pre-Launch
- Development blog series
- Twitter/X progress updates
- Reddit r/gamedev posts
- YouTube devlogs
- Twitch development streams

### Launch
- Product Hunt submission
- Hacker News Show HN
- IndieDB presence
- itch.io release
- GitHub trending push

### Growth
- Streamer/YouTuber keys
- Speedrun.com category
- Game jams participation
- Conference talks
- Open source showcase

## Budget & Resources

### Development Costs
- **Supabase:** $0-25/month (Free tier → Pro)
- **Domain:** $12/year
- **Assets:** $200 (sound effects, fonts)
- **Marketing:** $100 (ads, promotion)
- **Total:** <$500 first year

### Time Investment
- **Development:** 400 hours (20hr/week × 20 weeks)
- **Testing:** 80 hours
- **Documentation:** 40 hours
- **Marketing:** 40 hours
- **Total:** 560 hours

## Team Structure

### Current (Solo)
- Full-stack development
- Game design
- Narrative writing
- QA testing

### Future (Community)
- Pixel artists for creatures
- Sound designer
- Additional writers
- Balance testers
- Speedrun community

## Legal Considerations

- **MIT License:** Code open source
- **CC BY-SA:** Assets shareable
- **No Nintendo IP:** Original creatures only
- **COPPA Compliance:** 13+ age gate
- **Privacy Policy:** Data handling transparent

## Definition of Done

### MVP Complete When:
- [ ] 20 creatures catchable and breedable
- [ ] 3 areas with visible corruption
- [ ] 5 moral choices with consequences
- [ ] Cloud saves working reliably
- [ ] One complete story path
- [ ] No critical bugs

### Success Defined As:
- Personal enjoyment while playing
- 1000+ unique players
- 85%+ positive feedback
- Portfolio piece landing interviews
- Active community forming

## Next Steps

### Immediate (Week 1)
1. Implement Supabase authentication
2. Migrate saves to cloud
3. Fix test environment
4. Create dark UI theme

### Short-term (Month 1)
1. Build breeding system
2. Implement corruption mechanics
3. Write Act 1 narrative
4. Design 20 initial creatures

### Medium-term (Month 2-3)
1. Encyclopedia system
2. Achievement tracking
3. Variant encounters
4. Moral choice tree

## Conclusion

Shadow Chronicles represents an evolution from a simple GB tribute to an ambitious narrative-driven creature collector. By embracing complexity in breeding, depth in narrative, and permanence in choices, it fills a unique niche in the genre.

The pivot to cloud infrastructure enables the multiplayer-adjacent features players expect while maintaining the single-player focus. The dark narrative provides differentiation in a crowded market.

With disciplined execution over 6 months, this project can achieve its dual goals: creating a personally satisfying game experience and serving as a standout portfolio piece demonstrating full-stack capabilities.

---

*Project Brief Revised: 2025-08-07*  
*Prepared by: Mary, Business Analyst*  
*Status: Approved for Development*