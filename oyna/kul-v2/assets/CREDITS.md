# Credits — Sıfır Gün Cumhuriyeti: Kül (v2 assets)

Every asset in this folder is **CC0 1.0 (public domain)**. You don't have to credit anyone, but we credit them here as thanks.
Per-file sources (exact URLs) are listed in `manifest.json`.

## 3D models
- **Kay Lousberg / KayKit** (kaylousberg.com), CC0:
  - Character Pack: Adventurers 1.0: https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0 (hero, npc_nur, npc_mavi, npc_bora, weapon_sword/dagger/crossbow/axe/smokebomb)
  - Character Pack: Skeletons 1.0: https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Skeletons-1.0 (sk_warrior/minion/mage/rogue, weapon_sk_*)
  - Dungeon Remastered 1.0: https://github.com/KayKit-Game-Assets/KayKit-Dungeon-Remastered-1.0 (walls, floors, rubble, barrel, crates, chest, torches, barrier, pillar, coins)
  - Space Base Bits 1.0: https://github.com/KayKit-Game-Assets/KayKit-Space-Base-Bits-1.0 (containers, cargo, rocks, structure_low)
  - City Builder Bits 1.0: https://github.com/KayKit-Game-Assets/KayKit-City-Builder-Bits-1.0 (dumpster, car_sedan, streetlight, trash, building_b)
- **Quaternius** (quaternius.com), CC0:
  - Animated Mech Pack (March 2021): https://opengameart.org/content/animated-mech-pack. The glTF versions come from the community conversion at https://github.com/trebeljahr/quaternius-showcase (the repo code is MIT; the models are still Quaternius CC0). Used for boss_mech (Leela) and mech_elite (Mike).
  - Cyberpunk Game Kit: https://quaternius.com/packs/cyberpunkgamekit.html (drone_tazi, drone_scout, enemy_walker, plus the fence, street light, pipes, AC, antenna, cable, hazard sign, lootbox, TV, tank, computer and health-pickup props)
  - Survival Pack (tent, trashcan, bonfire, gas can, propane tank), via the same mirror.

## Textures / HDRI
- **Poly Haven** (polyhaven.com), CC0: kloofendal_overcast_puresky, industrial_sunset_puresky (HDRIs, Greg Zaal / Poly Haven); brown_mud_02, concrete_floor_worn_001, rusty_metal_02 (PBR textures).

## Audio
- **Kenney** (kenney.nl), CC0: RPG Audio, Sci-fi Sounds, Interface Sounds (OGA mirrors: https://opengameart.org/sites/default/files/RPGsounds_Kenney.zip, .../sci-fi_sounds.zip, .../kenney_interfaceSounds.zip)
- **artisticdude**: "Swishes Sound Pack" (CC0): https://opengameart.org/content/swishes-sound-pack (sword swings)
- **rubberduck**: "100 CC0 SFX #2": https://opengameart.org/content/100-cc0-sfx-2
- **Juhani Junkala**:
  - "The Essential Retro Video Game Sound Effects Collection" (CC0): https://opengameart.org/content/512-sound-effects-8-bit-style
  - "Post Apocalyptic Wastelands [Loop Ready]" (CC0, music_explore)
- **T&T**: "Free Cyberpunk Pack", track "Space Collisions" (CC0, music_combat): https://opengameart.org/content/t-t-free-cyberpunk-pack
- **Tsorthan Grove**: "The World Fell Silent", track "Outpost (loop)" (CC0, music_dungeon): https://opengameart.org/content/the-world-fell-silent
- `amb_wind_ash_loop.m4a`: synthesized for this project from filtered noise (own work, CC0).
- The crit, legendary, level-up, EMP and potion sounds are our own layered mixes of the CC0 sounds above.

## Processing
The files were processed with glTF-Transform 4.5 (dedup, resample, prune, meshopt + quantization), FFmpeg (AAC), Pillow and numpy.
For characters, the unused animation clips and the constant rest-pose tracks were removed, and textures were capped at 512 px.
