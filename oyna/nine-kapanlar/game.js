      window.__bgxLevelHook = true; // BGX2 site: win() calls window.bgxLevelComplete (ads.js)
      (function game() {
      /* ===== Bail out quietly if Three.js or WebGL is missing ===== */
      const probe = document.createElement("canvas");
      if (!window.THREE || !(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
      /* =====================================================================
         LEVELS  (rows top to bottom; each cell is 1 world unit)
         #  ground        F  fake ground (collapses)   ~  water
         A  hidden arrow wall (fires toward a nearby trigger)
         a  invisible arrow trigger    V  ceiling spike (drops)
         T  TNT barrel    P  player start    G  green flag
         Surprise traps (invisible trigger tiles):
         j  Surat: troll face fills the screen 0.5 s (scare only)
         e  Ezici: visible red floor button; 0.35 s after a press the block drops on it (squash)
         b  Kuş: black bird swoops in at head height (knocked away)
         k  Kapan: trap door opens right under your feet (fall)
         f  Sahte Bayrak: a flag that turns into spikes when touched
         Y  Ayı Kapanı: steel bear trap on the floor, snaps shut (squash); jump over it
         L  Sarkaç: rusty blade on a long arm swinging from the ceiling (cut in two)
         D  Dikenli Duvarlar: trigger; two spiked walls grind in from 3 tiles each side and meet
            1 tile ahead in 1.8 s (squash); run past before they close
         Huzurevi traps (zone 1, levels 21–40):
         W  Tekerlekli Sandalye: empty wheelchair rolls at you from 5 tiles (knocked flying); jump it
         t  Şakırdayan Takma Diş: wind-up teeth hop toward you (bite); jump them, they fall in pits
         n  Örgü Şişi: knitting basket on a wall shelf, shoots a needle every 1.6 s
         w  Islak Zemin: wet floor with a "Dikkat Kaygan Zemin" sign; you slide and cannot stop
         s  Düşen Saksı: flowerpot on a high window ledge; wobbles 0.25 s, then drops (within 2 tiles)
         h  Kayan Halı: rug; stepping on it yanks it and flings you 3 tiles back (not deadly)
         Hastane traps (zone 2, levels 41–60):
         E  Elektrikli Zemin: floor plate, on/off every 1.2 s (blue sparks + buzz); touching it while on = death
         C  Sedye: stretcher rolling back and forth on a 5-tile track; side hit = knocked flying; stand on top
         I  Serum Askısı: IV pole; within 2 tiles it wobbles 0.3 s, then tips toward you, covering 2 tiles
         Q  Otomatik Kapı: sliding doors shut for 1 s every 2.5 s, red light 0.4 s before; caught = squash
         Kasap/Mezbaha traps (zone 3, levels 61–80):
         J  Et Kancası: meat hook on a ceiling rail sliding ±2 tiles at head height; hit = knocked flying
         c  Satır Fırlatan: cleaver block on a wall post; 0.3 s shine, then throws a spinning cleaver at you every 1.8 s
         g  Kıyma Makinesi: grinder at the bottom of a pit (row 8); falling in = death
         u  crumbling pit rim: ground that drops 0.5 s after you step on it
         d  Asılı Dana: hanging cartoon carcass; within 1.5 tiles it creaks 0.45 s, then swings toward you (knocked flying)
         o  Soğuk Hava Kapısı: freezer door; within 1 tile it hisses 0.5 s, then slams shut sideways (squash); reopens after 2 s
         r  Kanlı Değil Ketçaplı Zemin: comic ketchup puddle; you slide like on w, but toward the nearest hazard
         q  Sucuk Sarkacı: string of sausages on a short pendulum, 1.2 s period (knocked flying)
         m  Konveyör Bant: meat conveyor; pushes you 3 tiles/s toward the nearest hazard, walking against it is slow
         Lunapark traps (zone 4, levels 81–100):
         N  Çarpışan Araba: bumper car bouncing between two walls on a 6-tile track, honks at each bounce (knocked flying); jump it
         x  Palyaço Kutusu: jack-in-the-box; within 1 tile it plays a 0.3 s music-box tell, then a clown head springs up (knocked flying)
         i  Dönme Dolap: slow ferris wheel (4 small cabins) centred over a pit; ride a cabin across; one is rigged and drops 0.6 s after you land
         l  Balon Patlatma: floor balloon; walking into it pops it (bang) and launches you 3 tiles up into a ceiling spike row that
            pulls in for 0.8 s of every 2 s; pop it while the spikes are in, or jump the balloons
         y  Hız Treni Vagonu: visible track switch; step on it, a bell rings 0.4 s, then a coaster cart rushes in along the rail from off-screen (knocked flying); jump it
         p  Pamuk Şeker Bulutu: pink sticky cloud on the floor; slows you to 30% while inside (not deadly)
         M  Ayna Labirenti Sahte Duvar: mirror panel that looks like a wall but is passable
         1  Ayna Labirenti sahte boşluk: looks like an open gap, is a solid mirror (bonk + bounce back)
         2  Hedef Tahtası Okları: shooting-gallery board; every 2.2 s fires 3 darts left at head, chest and feet height, 0.15 s apart
         Kanalizasyon traps (zone 5, levels 101–120):
         3  Fare Sürüsü: pack of 5 rats; within 6 tiles they run along the floor at you, squeaking (bite); jump them, they fall in pits
         4  Rögar Kapağı: manhole cover; every 2 s a steam jet blasts it up (hiss 0.4 s before); over it during the blast = launched; else floor
         5  Timsah: crocodile in a water gap (place on the water's top row), only eyes and bubbles show; jump over it and it
            snaps up 1.5 tiles after a 0.25 s bubble burst (bite)
         6  Yükselen Lağım: green sewage strip in a low floor dip; once you enter it rises 1.2 tiles over 2.5 s, then sinks (water)
         7  Damlayan Boru: ceiling pipe (under a ceiling block); drips a toxic green drop every 1.4 s (death on hit)
         (  Dönen Pervane: sewer fan in a wall vent at foot height; stops for 0.8 s of every 2.5 s; touch while spinning = cut in two
         )  Lağım Faresi Kralı: one big crowned rat; within 7 tiles it hops 3 arcs (1 tile high) at you, then retreats (bite)
         Fabrika traps (zone 6, levels 121–140):
         8  Hidrolik Pres: press slams down every 2 s (0.4 s hiss + yellow-black stripes flash first); under it = squash
         9  Kaynak Robotu: ceiling robot arm sweeps a welding spark beam across 3 floor tiles, 1.8 s period (burn); jump it
         0  Dişli Çark Platformu: big gear in a pit (place on the row above the gap); ride its top (2 tiles/s right); teeth kill from the side
         !  Kesici Lazer Kapısı: doorway with a low and a high red laser beam, alternating on/off every 0.9 s; active beam = cut in two
         $  Düşen Kasa Vinci: ceiling crane carries a crate ±2.5 tiles; when you're directly below it creaks 0.3 s, then drops the crate
            (squash); the landed crate stays as a solid block
         *  Kıvılcım Yağmuru: ceiling grinder showers sparks over this tile and the next, 1 s on / 1.4 s off, 0.3 s whine first (burn)
         /  Eğimli Rampa Varili: ramp rising to the right; every 2.5 s a barrel rolls off it to the left (knocked flying); jump them
         Buzhane traps (zone 7, levels 141–160):
         %  Buz Sarkıtı: icicle under a ceiling block; V-style bait (0.9 tiles ahead), 0.08 s crack, fast fall (spike)
         &  Buz Zemin: ice floor; she keeps momentum and stops very slowly (10% friction); not deadly
         @  Kartopu Yuvarlanan: snowball rolls at you, growing from 0.5 to 1.5 tiles over 5 tiles (knocked flying); jump it early
         +  Donduran Fan: freezer fan; blows icy wind 1.5 s of every 3 s (0.4 s whoosh first) over 7 tiles, pushing you
            4 tiles/s toward the nearest hazard (left first); not deadly itself
         ;  Kırılan Buz Köprü: ice bridge tile (row above water); cracks 0.4 s after you step on it, then falls into the water
         :  Buz Küpü Pres: two ice blocks slide together over this 1-tile gap every 2.2 s (0.3 s creak first); caught = squash
         Metro Tüneli traps (zone 8, levels 161–180):
         <  Metro Treni: track tile (a run of them is one section); every 3.5 s a train rushes through from the right, headlights
            glow and rails rattle 0.8 s before; on the track when it passes = knocked flying; wait on the ledges above
         ,  Elektrikli Üçüncü Ray: low sparking live rail on the floor; touching it = burn; jump along it
         >  Kapanan Vagon Kapısı: metro car doors (put a # above, 3 rows up); ding-dong, then shut 1.2 s of every 3 s;
            caught = squash; closed = wall
         [  Yürüyen Merdiven: escalator steps; carry you 3 tiles/s toward the nearest hazard, walking against it is slow; not deadly
         {  Turnike: ticket turnstile; every 1.5 s the arm clicks 0.3 s, then spins hard (knocked flying); pass while it's still
         ?  Sarkan Kablo: broken live cable from the ceiling, swinging and sparking on a 1.6 s pendulum (burn)
         Kukla'nın Stüdyosu traps (zone 9, levels 181–200):
         ]  Sahne Spot Işığı: heavy spotlight on the rigging; when you're directly below it flickers 0.3 s with a chain rattle,
            then drops (squash); run under it, don't stop
         }  İp Kuklası Elleri: two giant marionette hands on strings; every 2.4 s they creak 0.4 s (shadow on the floor), then
            come down and clap over the 2 tiles around this one (squash)
         '  Sahte Alkış Kapanı: stage trapdoor in the floor row (put blanks under it); every 3 s an ALKIŞ sign lights with a
            0.4 s drumroll, then the doors drop open for 1 s (fall)
         ç  Kamera Vinci: film camera on a long boom arm, sweeping an arc through head height on a 2 s period (knocked flying)
         ş  Konfeti Topu: confetti cannon; every 2 s a 0.3 s fuse sizzle, then a heavy streamer-shot fired horizontally at you (knocked flying)
         ğ  Sahte Çıkış Kapısı: door under a glowing ÇIKIŞ sign; touching it punches a boxing glove out (knocked flying); jump over it
         ö  Döner Sahne: rotating stage segment in the floor row (put blanks under it); every 2.5 s a 0.4 s rumble, then it flips
            over (fall)
         Bodrum traps (zone 0, generated levels 11–20):
         ü  Kazan Patlaması: old boiler; every 3 s it shakes and whistles 0.6 s, then vents a scalding steam blast 3 tiles
            sideways toward you (burn); jump the jet or pass while it idles
         Ç  Düşen Raf: heavy shelf of jars against the wall; within 1.5 tiles it rattles 0.3 s, then topples toward you (squash)
         Ş  Fare Kapanı Dev: oversized mousetrap with a cheese wedge; touching it snaps (squash); jump over it
         Ğ  Sallanan Ampul: bare bulb on a cord swinging low and sparking on a 1.5 s period (burn)
         Ö  Örümcek: cartoon spider on a thread; when you're directly below it hisses 0.25 s, drops to head height, then climbs back (bite)
         Ü  Çamaşır Makinesi: shaking washing machine; every 2.2 s a 0.3 s rumble, then a heavy wet sock flies horizontally at you (knocked flying)
         İ  Gıcırdayan Merdiven Basamağı: wooden stair step (a platform); creaks when you land, snaps in half 0.3 s later and falls
         ı  Fırlayan Tahta: loose 2-tile floorboard; stepping on one end flips the other end up after a 0.15 s creak, a nail-board
            swinging into you (spike); jump as soon as you step on it
         Extra traps:
         -  Düşen Tavan Vantilatörü (Huzurevi): ceiling fan; directly below it wobbles 0.4 s, then drops (squash)
         .  Penguen Kızağı (Buzhane): penguin belly-slides at you fast once within 6 tiles (knocked flying); jump it
         `  Düşen Tabela (Metro): hanging station sign; directly below, its chain creaks 0.3 s, then snaps (squash)
         "  Su Tabancası Ördekleri (Lunapark): 3 tin ducks slide back and forth on a head-height rail (knocked flying)
         Final traps:
         â  Tekerlekli Defibrilatör Arabası (Hastane): crash cart; every 2 s a 0.4 s ŞARJ beep, then a lightning arc 2 tiles toward you (burn)
         î  Yuvarlanan Kıyma Topu (Kasap): big meatball; within 7 tiles it rolls at you (knocked flying); jump it
         û  Perde Kapanı (Stüdyo): heavy theatre curtain; directly below, a 0.3 s rope slip, then the weighted bar drops (squash)
         ê  Patlayan Turşu Kavanozu (Bodrum): pickle jar; within 1.5 tiles it bubbles 0.7 s, then bursts, glass spraying 1.5 tiles (spike)
         ===================================================================== */
const LEVELS = [
[
"#",
"#",
"#",
"#                            #####",
"#                             VVV",
"#                                                    #",
"A P   a              T                          a    A    G",
"#########FF#####~~~#####~~~#########FFF#####~~~####################",
"#########  #####~~~#####~~~#########   #####~~~####################"
],
[
"#",
"#                              R",
"#",
"#                                          #####",
"#                                           VVV                             ##",
"#              ##                                                    #  ##      ##",
"#  P    ü      ##    ü   T             Y                ж    a   k   A  ##             ü    z     Ç     Ğ    f          G",
"############################~~~~~~~~##############FF######################          ##############################################",
"############################~~~~~~~~##############  ######################          ##############################################"
],
[
"#",
"#",
"#                              Ö",
"#                   ######   #####                                                         ####",
"#                  İ                                                                        VV",
"#                 İ                                                                      #",
"#  P   Ç     Ç   İ                    ê    Y     ж      Ö   Ö   Ğ   ê           z      # #      Ç          T                G",
"####################              ####################################~~~###~~~###~~~##############FFF################################",
"####################              ####################################~~~###~~~###~~~##############   ################################"
],
[
"#",
"#                                             S                                            R   R",
"#",
"#",
"#                                                                  #",
"#                                                                # #",
"#  P    Ü    ı                     ı   Ü               ж    Ü  # # #             Y   ı                Ü    Z    f          G",
"################~~=~~~~^~~~~=~~~##########~~~~~~~~~####################   _    ##########~~~~~~~~~~##################################",
"################~~~~~~~~~~~~~~~~##########~~~~~~~~~####################        ##########~~~~~~~~~~##################################"
],
[
"#",
"#                                                                                          L",
"#",
"#                           ####                             #####",
"#                            VV                               VVV",
"#",
"# O  P      Ş    Y     Ş         Ş    T    Ş    Y   Ş   Ş            T    Ş  Y   Ş      Ş      Ş              G",
"########################################################################################################################",
"########################################################################################################################"
],
[
"#",
"#                                                                                   L",
"#                     s   s                                       s",
"#",
"#",
"#                                               ##                                                     #",
"#  P      W     t             Y          t   t  ##    ж      W         T                   W     a     A  t             G",
"##################################~~~~####################################FF####FF################################################",
"##################################~~~~####################################  ####  ################################################"
],
[
"#",
"#                     L                                                                         L",
"#",
"#                                     ###",
"#                                      V",
"#",
"#  P  wwwww                     wwwwww         ж     h    h  z             ж     wwww     t         X   f          G",
"############################~~~################################~~~~_~~~######################################################",
"############################~~~################################~~~~~~~~######################################################"
],
[
"#",
"#                                                                                    R",
"#",
"#                                         ###",
"#                                    ###       ###",
"#                                 ##",
"#  P   n     n       -    h     # ##                  ж     -     n     Y     ж              K    n   e             G",
"####################################              ################################~~~~~~=~####################################",
"####################################              ################################~~~~~~~~####################################"
],
[
"#",
"#                R   R                                            L",
"#                                                 s",
"#",
"#                                                                 ##",
"#                                                             ##      ##                            #",
"#  P     W                 D      Z       ж              t                wwww   W      ж    a  k   A  n   f          G",
"##############~~~~~~~~~~####################################            ########################################################",
"##############~~~~~~~~~~####################################            ########################################################"
],
[
"#",
"#",
"#                                б",
"#                               ###",
"#                      б",
"#                     ###    ##",
"#  P           б                  Б                 б            G",
"##########################################################################",
"##########################################################################"
],
[
"#",
"#                                                                           R",
"#",
"#",
"#",
"#                                 ##    ##",
"#  P   EE    I    C        Y      ##EEEE##   I     ж     I   C     T             EE  EE  z  f          G",
"##############################~~~####################################~~~=~~~~~~##################################",
"##############################~~~####################################~~~~~~~~~~##################################"
],
[
"#",
"#",
"#",
"#           v             v                                          v  v  v",
"#                                                                                      ##",
"#                                                             #                    ##",
"#  P   Q        U    H      Y      Q  EE  Q      ж    a   k   A  H             U              H                 G",
"##############################FFF################################################         ################################",
"##############################   ################################################         ################################"
],
[
"#",
"#",
"#",
"#                                                               ###",
"#                                                                V",
"#",
"#  P     â          B       EE   I     B     B       ж      â       Y            Q   EEE z  f          G",
"#################        ############            ######################~~~_~~~~##################################",
"#################        ############            ######################~~~~~~~~##################################"
],
[
"#",
"#                R     S",
"#",
"#                                    v                  #####",
"#                                                        VVV",
"#                                                     #",
"#  P     C                     D        I     ж     # #       â               H   EE  U             G",
"##############~~~~~~~~~~~~~~####################################~~^~~~~=~~~~##################################",
"##############~~~~~~~~~~~~~~####################################~~~~~~~~~~~~##################################"
],
[
"#",
"#",
"#",
"#                                 v",
"#",
"#",
"#  P    EE   I     C      Y           H      ж     Q    U        G               EE        Y",
"############################~~~##############################################################################",
"############################~~~##############################################################################"
],
[
"#",
"#",
"#",
"#",
"#                                                                        ##",
"#                                      ##                            ##",
"#  P   J       c     d    d  Y     c   ##  J     ж     J      J   T             c    z    f          G",
"##############################~~~##################################          ##################################",
"##############################~~~##################################          ##################################"
],
[
"#",
"#                                                                      L",
"#",
"#",
"#",
"#",
"#  P   o     e    rrrrr  q  Y       o   e   o     ж    rrrr q   q                e  e   d             G",
"##############################~~~~##################################~~~=~~~_~~##################################",
"##############################~~~~##################################~~~~~~~~~~##################################"
],
[
"#",
"#",
"#",
"#",
"#",
"#                                   ##  ##",
"#  P   mmmmmm              î      mmmmmmmm              ж      î     î  Y   mmmm  c           J     z   f          G",
"################u   u##########################u   u##################################u   u##################################",
"################# g ############################ g #################################### g ###################################"
],
[
"#",
"#                R    R                                                            L",
"#",
"#",
"#                                                                                  ##",
"#                                                                              ##      ##",
"#  P    î                   rrrr D    q     ж     mmmmm  J          o    e                   ж     c   d   î    f          G",
"##############~~~~~~~~~~~~##################################u   u############            ############################################",
"##############~~~~~~~~~~~~################################### g #############            ############################################"
],
[
"#",
"#",
"#",
"#                                 б",
"#                     б          ###",
"#                     ##",
"#  P        mmmm  б            #      Б    rrr б          G",
"##########################u   u####################################",
"########################### g #####################################"
],
[
"#",
"#",
"#",
"#                                                                        l",
"#                                                                        ##",
"#                                  ##                                ##",
"#  P   N       x    lll   Y        ## x   N      ж     pp   2    T              x    z    f          G",
"##############################~~~##################################          ##################################",
"##############################~~~##################################          ##################################"
],
[
"#",
"#                                                  R     R",
"#",
"#                                    v",
"#",
"#",
"#  P    y      Y       i       y            ж                   N    y    e     \"    i   f          G",
"##################~~~~~~~~~~####################~~~~~~~~~~~~~~################################################",
"##################~~~~~~~~~~####################~~~~~~~~~~~~~~################################################"
],
[
"#",
"#",
"#       #     #                     #       #                                  #",
"#       1     1                     1       1                ###               1",
"#       1     1                     1       1                 V                1",
"#       M     M                     M       M                                  M",
"#  P    M     M      \"     Y        M   pp  M      ж     x                     M   2   z             G",
"##############################FFF##################################~~~_~~~~####################################",
"##############################   ##################################~~~~~~~~####################################"
],
[
"#",
"#",
"#",
"#",
"#",
"#                                                           ##",
"#  P   2     \"      llll   D        pp   2  Y     ж     \"   ##  N               x    pp   f          G",
"##############################~~~~##################################   _     ##################################",
"##############################~~~~##################################         ##################################"
],
[
"#",
"#                                                              L",
"#                       #                            #",
"#                       1   ###                      1                     ###  ###",
"#                       1    V                       1                      V    V",
"#                       M                            M",
"# O  P      lll   Y     M            T    ll    Y    M   Y           lll            T             G",
"############################################################################################################",
"############################################################################################################"
],
[
"#",
"#                                                             R",
"#",
"#                                 ###   ###",
"#                                  7     7",
"#",
"#  P   4     4           3    Y                   ж                 4   (    e   f          G",
"####################  ################################~~~=~~~~~~~~####################################",
"####################  ################################~~~~~~~~~~~~####################################"
],
[
"#",
"#                             L                                                           L",
"#",
"#                                                                            ###",
"#                                                                             7",
"#",
"#  P     Y                             (     4      ж                   )                     f          G",
"##############~~5~####~~5~##############################~~5~~###~~5~~##############~~~_~~~~~~######################",
"##############~~~~####~~~~##############################~~~~~###~~~~~##############~~~~~~~~~~######################"
],
[
"#",
"#                                             L",
"#",
"#                                                   ###",
"#                                                    7                ##",
"#                                                                 ##",
"#  P    (                3    T       ж                   (   4                z                G",
"################666666####################66666666##############          ################################",
"################################################################          ################################"
],
[
"#",
"#                                           R",
"#",
"#                           ###",
"#                            7",
"#",
"#  P   )     4          3            ж           (    D    )     ж                  4    Y    f          G",
"################~~5~~####################666666######################~~~^~~~~=~~~##################################",
"################~~~~~################################################~~~~~~~~~~~~##################################"
],
[
"#",
"#",
"#",
"#                       б",
"#                      ###                      б",
"#                    ##                        ##",
"#  P            б                  Б  б                        G",
"##########################~~5~##########~~=~~~##########################",
"##########################~~~~##########~~~~~~##########################"
],
[
"#",
"#",
"#",
"#",
"#",
"#",
"#  P   8     8              *    Y     0     8       ж               *    8   e   f          G",
"######################   ################################~~~_~~~_~~####################################",
"######################   ################################~~~~~~~~~~####################################"
],
[
"#",
"#                                                           L",
"#",
"#",
"#                                                           ##",
"#                                                       ##",
"#  P    9      !       Y    /     !    9    T     ж                /    !   z             G",
"##################~~##################################          ####################################",
"##################~~##################################          ####################################"
],
[
"#",
"#                                          R",
"#",
"#",
"#",
"#",
"#  P    $              $     0      ж                  *    $   Y     0    8   f          G",
"##############~~~~~~####################~~~~~~~~=~~~################################################",
"##############~~~~~~####################~~~~~~~~~~~~################################################"
],
[
"#",
"#",
"#",
"#",
"#",
"#",
"#  P   /     8       9     Y       !    *        ж      0    $   T     8    z              G",
"##############################~~~####################################################################",
"##############################~~~####################################################################"
],
[
"#",
"#                                                              L",
"#",
"#                           ###                                    ###",
"#                            V                                      V",
"#",
"# O  P      9     Y     !            T    9      Y    !   Y                 9     T               G",
"############################################################################################################",
"############################################################################################################"
],
[
"#",
"#                                                                           R",
"#",
"#      ###   ###",
"#       %     %",
"#",
"#  P                &&&&&&  T          @    Y      ж     &&&& :    z            f          G",
"################################~~~##################################~~~_~~~~~~######################",
"################################~~~##################################~~~~~~~~~~######################"
],
[
"#",
"#",
"#",
"#                                ###",
"#                                 %",
"#",
"#  P     +                   Y            ж            +                   @    e               G",
"##############;;;;####;;;;####################;;;;;;############~~~=~~~~##################################",
"##############~~~~####~~~~####################~~~~~~############~~~~~~~~##################################"
],
[
"#",
"#",
"#",
"#                                            ###",
"#                                             %           ##",
"#                                                     ##",
"#  P          :     &&&&&  Y      ж      :                       +    z    f          G",
"####################################################          ##################################",
"####################################################          ##################################"
],
[
"#",
"#                                           R",
"#",
"#                      ###                                                        ###",
"#                       %                                                          %",
"#",
"#  P  &&&&  Y                @       ж                 :    D          ж      +         f          G",
"################;;;;;####################~~~~~~~~^~~~########################################################",
"################~~~~~####################~~~~~~~~~~~~########################################################"
],
[
"#",
"#",
"#                        б",
"#                       ###",
"#                                               б",
"#                    ##                         ##",
"#  P       &&&&&& б              &&& Б  б  &&&&            G",
"############################;;;;####################################",
"############################~~~~####################################"
],
[
"#",
"#",
"#",
"#",
"#",
"#                      ##     ##               #       #",
"#  P   {     ,,,    ##<<<<<<<<<<<#Y     ж      >   ,,, >             {    z    f          G",
"##########################################################~~~_~~~~##################################",
"##########################################################~~~~~~~~##################################"
],
[
"#",
"#                                                            L",
"#",
"#",
"#                                                            ##",
"#                                                        ##",
"#  P   [[[[[[  Y        `    ?       ж     [[[[  `   T              ?     e              G",
"##################~~~##################################          ##################################",
"##################~~~##################################          ##################################"
],
[
"#",
"#                                                          R",
"#",
"#",
"#",
"#       #            ##     ##                    #",
"#  P    >    ,,,  ##<<<<<<<<<<<#`     ж      ?    >   Y              {    z    f          G",
"########################################################~~~~~~~=~~##################################",
"########################################################~~~~~~~~~~##################################"
],
[
"#",
"#",
"#",
"#",
"#",
"#                                                       #",
"#  P   ,,,    {     [[[[   Y        `    ?       ж      >   ,,,  T     {    e              G",
"##############################~~~####################################################################",
"##############################~~~####################################################################"
],
[
"#",
"#                                                              L",
"#",
"#                            ###                                   ###",
"#                             V                                     V",
"#",
"# O  P     ,,,    Y    [[[[          T    ,,,    Y   [[[  Y                 ,,,   T               G",
"############################################################################################################",
"############################################################################################################"
],
[
"#",
"#",
"#",
"#",
"#",
"#",
"#  P    ]     }      ş     Y       ç     ]      ж      }    ğ   T            û    z    f          G",
"##############################~~##################################~~~_~~~~##################################",
"##############################~~##################################~~~~~~~~##################################"
],
[
"#",
"#",
"#",
"#",
"#                                                             ##",
"#                                                         ##",
"#  P    ç             ]     Y         ж      }    û   e              ç    z               G",
"################'''############ööö######################          ##################################",
"################   ############   ######################          ##################################"
],
[
"#",
"#                                                         R   R",
"#",
"#",
"#",
"#",
"#  P   ]     û          }    Y       ж      ş   ç    ğ              ]    z    f          G",
"##################ööö##################################~~~~~~~~~~##################################",
"##################   ##################################~~~~~~~~~~##################################"
],
[
"#",
"#                                                                                    R",
"#",
"#                           ###",
"#                            %",
"#                                             ##     ##",
"#  P   ]    J           8            ж     ##<<<<<<<<<<<#x       D    }       ж                  û    Y    f          G",
"################~~5~~######################################'''####################~~~~~~~~^~~~##################################",
"################~~~~~######################################   ####################~~~~~~~~~~~~##################################"
],
[
"#",
"#",
"#                         б",
"#                        ###",
"#                      ##                        б",
"#                    ##                         ##",
"#  P         ]    б                 Б  б                        G",
"############################ööö##########~~=~~~##########################",
"############################   ##########~~~~~~##########################"
]
];
const NAMES = ["İlk Adım", "Kazan Dairesi", "Kiler", "Çamaşırhane", "Kaç! Fare Yuvası", "Ziyaret Saati", "Islak Koridor", "Örgü Odası", "Gece Nöbeti", "KUKLA: Bakıcı", "Acil Servis", "Koridor 3", "Elektrik Kesintisi", "Ameliyathane", "Taburcu", "Kasap Dükkânı", "Soğuk Oda", "Kıyma Hattı", "Mezbaha", "KUKLA: Kasap", "Lunapark Kapısı", "Hız Treni", "Ayna Labirenti", "Atış Poligonu", "Kaç! Dev Top", "Rögar", "Timsah Havuzu", "Yükselen Lağım", "Fare Kralının Tahtı", "KUKLA: Lağım", "Pres Hattı", "Kaynak Atölyesi", "Vinç Sahası", "Montaj Bandı", "Kaç! Erimiş Demir", "Buz Deposu", "Kırık Göl", "Penguen Pisti", "Donmuş Koridor", "KUKLA: Buz", "Peron", "Yürüyen Merdiven", "Son Sefer", "Ters Hat", "Kaç! Kaçak Vagon", "Sahne Arkası", "Canlı Yayın", "Işıklar Söndü", "Final Provası", "KUKLA: Büyük Final"];
const MODS = ["", "", "", "", "", "", "", "", "", "", "", "", "dark", "", "", "", "", "", "", "", "", "", "dark", "rev", "", "", "", "dark", "", "", "", "", "dark", "rev", "", "", "", "dark", "", "", "", "", "dark", "rev", "", "", "", "dark", "", ""];
const RUNFLAGS = [14, 24, 34, 44];
const BOSS_LVLS = [9, 19, 29, 39, 49];
const BOSS_CFG = { 9: { rage: true, easy: true, intro: "Bakıcı Kukla geldi! Yeşil yanan düğmeye bas, kum torbası kafama düşsün!" },
  19: { rage: true, sweep: true, intro: "Kasap Kukla! Yerden savurduğum satırların üstünden zıpla, yanan düğmelere bas!" },
  29: { rage: true, sweep: true, wave: true, intro: "Lağım Kukla! Yerden gelen pis su dalgasının üstünden zıpla, timsaha dikkat, yanan düğmelere bas!" },
  39: { rage: true, fast: true, intro: "Buz Kukla! Zemin kaygan, buz sarkıtları hızlı düşer. Yanan düğmelere bas!" },
  49: { rage: true, sweep: true, fast: true, intro: "Son gösteri, nine! Hem yerden süpürürüm hem tepeden atarım. Bütün düğmelere bas!" } };

      /* ===== Levels 11–200: seeded chains of dense, passable combo chunks (seed = level number) ===== */
      const TOTAL = 50;
      const CK = (rows) => rows.join("|");
      const CHUNKS = [ // [min tier, safe in a ball chase, rows 0–8, theme name]
        [1, 1, CK(["","","","","","","   Y    Y     Y   ","##################","##################"]), "Ayı Kapanları"],
        [1, 1, CK(["","    L       L     ","","","","","","##################","##################"]), "Sarkaç Koridoru"],
        [1, 0, CK(["","             L    ","","","","","  D               ","##################","##################"]), "Kapanan Duvarlar"],
        [1, 0, CK(["","","","","","","       Y          ","###FF#######~~~###","###  #######~~~###"]), "Yalancı Zemin"],
        [1, 0, CK(["","    R    ","","","","","            Y    ","#~~~~~~~##########","#~~~~~~~##########"]), "İp ve Kapan"],
        [1, 1, CK(["","","","    ####    ####  ","     VV      VV   ","","","##################","##################"]), "Tavan Dikenleri"],
        [1, 0, CK(["","","","","","","  Z     e     z   ","##################","##################"]), "Testere Hattı"],
        [1, 0, CK(["","","","","","        #         ","  a  k  A    Y    ","##################","##################"]), "Ok Pususu"],
        [1, 1, CK(["","","","","","","  T     b    T    ","####FF######FF####","####  ######  ####"]), "Patlayan Fıçılar"],
        [1, 0, CK(["","     L            ","","","","","","###~~~####~~~#####","###~~~####~~~#####"]), "Sarkaçlı Su"],
        [2, 0, CK(["","","","","","","  D        Y      ","##################","##################"]), "Ezilme Odası"],
        [2, 0, CK(["","","","","","","   e    e    e    ","##################","##################"]), "Ezici Sırası"],
        [2, 0, CK(["","         L        ","","","","","   z       Z      ","##################","##################"]), "Kesim Hattı"],
        [2, 0, CK(["","","","","","","                   ","##  =     ^     ##","##~~~~~~~~~~~~~~##"]), "Zincirli Platformlar"],
        [2, 0, CK(["","","","","        ###       ","        ###       ","  K     ###   Y   ","##################","##################"]), "Konteyner Duvarı"],
        [2, 0, CK(["","","","","","","     f      Y     ","##################","##################"]), "Sahte Bayrak"],
        [3, 0, CK(["","    R      L      ","","","","","              Y   ","#~~~~~~~##########","#~~~~~~~##########"]), "Sarkaçlı İp"],
        [3, 0, CK(["","","","","","","     _     Y      ","##~~~~~~~#########","##~~~~~~~#########"]), "Düşen Platform"],
        [3, 0, CK(["","       L          ","","","","","  D   k     z     ","##################","##################"]), "Ölüm Koridoru"],
        [3, 1, CK(["","","","   ###     ###    ","    V       V     ","","  Y    T    Y     ","####FF######FF####","####  ######  ####"]), "Kapan Tarlası"],
      ];
      // zone-only chunks, keyed by zone index (0 = Bodrum, 1 = Huzurevi, 2 = Hastane, 3 = Kasap, ... 6 = Fabrika, 7 = Buzhane); each mixes new traps with one old trap
      const ZONE_CHUNKS = {
        0: [
          [1, 0, CK(["","","","","","","   ü      ü    T  ","######~~~#########","######~~~#########"]), "Kazan Dairesi"],
          [1, 0, CK(["","","","","","","   Ç        Ğ      z  ","#########~~###########","#########~~###########"]), "Kiler Rafları"],
          [1, 1, CK(["","","","","","","   Ş      Ş      Y   ","#####################","#####################"]), "Dev Fare Kapanı"],
          [1, 1, CK(["","","","","","","   Ö      Ö      Y   ","#####################","#####################"]), "Örümcek Yuvası"],
          [1, 0, CK(["","","","","","","    ı       Ü       T  ","#######################","#######################"]), "Çamaşırhane"],
          [1, 0, CK(["","","","","","      İ","     İ          z   ","#####~~~############","#####~~~############"]), "Gıcırdayan Merdiven"],
          [1, 0, CK(["","","","","","","   ê     ê         z   ","#############~~~#######","#############~~~#######"]), "Turşu Kavanozları"],
        ],
        1: [
          [1, 1, CK(["","","","","","","        W      Y   ","###################","###################"]), "Tekerlekli Sandalye"],
          [1, 0, CK(["","            L     ","","","","","   t        t     ","######~~~#########","######~~~#########"]), "Takma Diş Saldırısı"],
          [1, 0, CK(["","","","","","","   n       n   e  ","##################","##################"]), "Örgü Köşesi"],
          [1, 0, CK(["","","","","","","  wwwwwww     T   ","#########~~~######","#########~~~######"]), "Kaygan Koridor"],
          [1, 1, CK(["","","    s    s    s   ","","","","           Y      ","##################","##################"]), "Saksı Yağmuru"],
          [1, 0, CK(["","","","","","","   h      t   z   ","##################","##################"]), "Halı Tuzağı"],
          [1, 1, CK(["","","","","","","     -        Y    ","###################","###################"]), "Tavan Vantilatörü"],
        ],
        2: [
          [1, 1, CK(["","","","","","","   EE     EE    Y  ","###################","###################"]), "Elektrikli Zemin"],
          [1, 0, CK(["","","","","","","     C          T  ","###########~~~#####","###########~~~#####"]), "Sedye Koşusu"],
          [1, 0, CK(["","","","","","","   I        I   e  ","######~~~##########","######~~~##########"]), "Serum Askıları"],
          [1, 0, CK(["","","","","","","   Q    EE    Q      z  ","###########~~###########","###########~~###########"]), "Otomatik Kapılar"],
          [1, 1, CK(["","","","    v       v     ","","","        Y         ","##################","##################"]), "Şırınga Rafı"],
          [1, 0, CK(["","","","","","","    H        U   e  ","####################","####################"]), "Yemek Saati"],
          [1, 0, CK(["","","","","","","      B      z    ","#####   ##########","#####   ##########"]), "Bipleyen Asansör"],
          [1, 0, CK(["","","","","","","     â            I   ","##########~~~#########","##########~~~#########"]), "Defibrilatör Arabası"],
        ],
        3: [
          [1, 0, CK(["","","","","","","   J        J    Y  ","####################","####################"]), "Et Kancaları"],
          [1, 0, CK(["","","","","","","  c      e      c   ","####################","####################"]), "Satır Atölyesi"],
          [1, 1, CK(["","","","","","","              Y   ","#####u   u########","#####  g  ########"]), "Kıyma Makinesi"],
          [1, 0, CK(["","","","","","","   d       d      z  ","#####################","#####################"]), "Asılı Dana"],
          [1, 0, CK(["","","","","","","  o       e     o    ","#####~~~#############","#####~~~#############"]), "Soğuk Hava Deposu"],
          [1, 0, CK(["","","","","","","  rrrrrr   Y      q    ","#######################","#######################"]), "Ketçaplı Sucuk"],
          [1, 1, CK(["","","","","","","   mmmmmm   T         ","################~~~###","################~~~###"]), "Konveyör Bant"],
          [1, 1, CK(["","","","","","","              î      Y  ","######~~~##############","######~~~##############"]), "Kıyma Topu"],
        ],
        4: [
          [1, 0, CK(["","","","","","","     N         T    ","###########~~#######","###########~~#######"]), "Çarpışan Arabalar"],
          [1, 0, CK(["","","","","","","   x        x    e  ","######~~############","######~~############"]), "Palyaço Kutusu"],
          [1, 0, CK(["","","","","","","         i         Y  ","########~~~###########","########~~~###########"]), "Dönme Dolap"],
          [1, 1, CK(["","","","","","","   lll      Y         ","################~~~###","################~~~###"]), "Balon Patlatma"],
          [1, 0, CK(["","","","","","","    y         T    ","##########~~~#######","##########~~~#######"]), "Hız Treni"],
          [1, 0, CK(["","","","","","","    pp      2    e   ","#####################","#####################"]), "Pamuk Şeker Atışı"],
          [1, 1, CK(["","","   #      #       ","   1      1       ","   1      1       ","   M      M       ","   M      M   Y   ","##################","##################"]), "Ayna Labirenti"],
          [1, 0, CK(["","","","","","","      \"           T   ","######################","######################"]), "Ördek Atışı"],
        ],
        5: [
          [1, 1, CK(["","","","","","","          3     Y   ","#####  #############","#####  #############"]), "Fare Sürüsü"],
          [1, 0, CK(["","","","","","","   4     4    e   ","##########~~~#####","##########~~~#####"]), "Rögar Kapakları"],
          [1, 0, CK(["","","","","","","             e    ","######~5~#########","######~~~#########"]), "Timsah Havuzu"],
          [1, 0, CK(["","           L      ","","","","","","####6666##########","##################"]), "Yükselen Lağım"],
          [1, 1, CK(["","","   ###     ###    ","    7       7     ","","","        Y         ","##################","##################"]), "Damlayan Borular"],
          [1, 0, CK(["","","","","","","   (       (     Y  ","####################","####################"]), "Dönen Pervane"],
          [1, 1, CK(["","","","","","","           )       T  ","#####~~#############","#####~~#############"]), "Fare Kralı"],
        ],
        6: [
          [1, 0, CK(["","","","","","","   8      8    e  ","##################","##################"]), "Hidrolik Presler"],
          [1, 1, CK(["","","","","","","     9        Y    ","###################","###################"]), "Kaynak Robotu"],
          [1, 0, CK(["","","","","","","       0      T   ","######   #########","######   #########"]), "Dişli Çark"],
          [1, 1, CK(["","","","","","","    !          Y  ","#########~~#######","#########~~#######"]), "Lazer Kapısı"],
          [1, 0, CK(["","","","","","","    $          8   ","#########~~~#######","#########~~~#######"]), "Kasa Vinci"],
          [1, 0, CK(["","","","","","","    *          8    ","###################","###################"]), "Kıvılcım Yağmuru"],
          [1, 0, CK(["","","","","","","     Y       /      ","#~~#################","#~~#################"]), "Rampa Varilleri"],
        ],
        7: [
          [1, 1, CK(["","","","   ###      ###   ","    %        %    ","","","         Y        ","##################","##################"]), "Buz Sarkıtları"],
          [1, 0, CK(["","","","","","","  &&&&&&     T     ","###################","###################"]), "Buz Zemin"],
          [1, 0, CK(["","","","","","","     @         z    ","########~~~#########","########~~~#########"]), "Kartopu"],
          [1, 0, CK(["","","","","","","            +   Y   ","#######~~~##########","#######~~~##########"]), "Donduran Fan"],
          [1, 1, CK(["","","","","","","                 Y    ","####;;;####;;;########","####~~~####~~~########"]), "Kırılan Buz Köprü"],
          [1, 0, CK(["","","","","","","    :       :     z   ","######################","######################"]), "Buz Küpü Pres"],
          [1, 0, CK(["","","","","","","        .           z   ","###############~~~######","###############~~~######"]), "Penguen Kızağı"],
        ],
        8: [
          [1, 0, CK(["","","","","      ##  ##  ##","","   ##<<<<<<<<<<<##  Y  ","#######################","#######################"]), "Metro Treni"],
          [1, 1, CK(["","","","","","","   ,,,    ,,,    T   ","#####################","#####################"]), "Üçüncü Ray"],
          [1, 0, CK(["","","","    #      #      ","","","    >      >    e  ","###################","###################"]), "Vagon Kapıları"],
          [1, 1, CK(["","","","","","","   [[[[[[         Y  ","#########~~~#########","#########~~~#########"]), "Yürüyen Merdiven"],
          [1, 0, CK(["","","","","","","    {      {     z   ","#####################","#####################"]), "Turnikeler"],
          [1, 0, CK(["","","","","","","    ?       ?     e  ","########~~~##########","########~~~##########"]), "Sarkan Kablo"],
          [1, 0, CK(["","","","","","","    `      `    e  ","#######~~~#########","#######~~~#########"]), "Düşen Tabela"],
        ],
        9: [
          [1, 1, CK(["","","","","","","    ]      ]      Y  ","#####################","#####################"]), "Spot Işıkları"],
          [1, 0, CK(["","","","","","","   }         }    e  ","#######~~###########","#######~~###########"]), "Kukla Elleri"],
          [1, 0, CK(["","","","","","","               T    ","######'''###########","######   ###########"]), "Sahte Alkış"],
          [1, 1, CK(["","","","","","","      ç         Y    ","#####################","#####################"]), "Kamera Vinci"],
          [1, 0, CK(["","","","","","","   ş        ğ      z   ","#######################","#######################"]), "Sahte Çıkış"],
          [1, 0, CK(["","","","","","","               T    ","#####ööö############","#####   ############"]), "Döner Sahne"],
          [1, 0, CK(["","","","","","","    û       û      T   ","#########~~############","#########~~############"]), "Perde Kapanı"],
        ],
      };
      const BREATHER = CK(["","","","","","","","######","######"]);
      const BREATHER_K = CK(["","","","","","","   ж","######","######"]); // a breather with a checkpoint in its middle, on the floor row
      let genName = "";
      function genLevel(n) {
        let s = Math.imul(n, 2654435761) >>> 0;
        const rnd = () => { s = (s + 0x6d2b79f5) >>> 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
        const chase = n % 10 === 0, tier = n < 40 ? 1 : n < 90 ? 2 : 3;
        const zone = Math.floor((n - 1) / 20), zc = (z) => (ZONE_CHUNKS[z] || []).filter((c) => c[0] <= tier && (!chase || c[1]));
        let pool = CHUNKS.filter((c) => c[0] <= tier && (!chase || c[1]));
        for (let z = 0; z < zone; z++) pool = pool.concat(zc(z)); // earlier zones' chunks join the normal pool
        const zpool = zc(zone); // this zone's own chunks: ~55% of picks
        const theme = (zpool.length ? zpool : pool)[Math.floor(rnd() * (zpool.length || pool.length))];
        genName = chase ? "Kaç!" : theme[3];
        const rows = ["", "", "", "", "", "", "", "", ""];
        const add = (str) => { const r = str.split("|"), w = Math.max(...r.map((x) => x.length)); rows.forEach((_, k) => (rows[k] += (r[k] || "").padEnd(w))); };
        // every run of V becomes a seeded cluster of 2–5 spikes, with the ceiling block above widened to match (chunk width unchanged)
        const clusterV = (str) => {
          const r = str.split("|"), w = Math.max(...r.map((x) => x.length));
          for (let k = 1; k < r.length; k++) {
            if (!r[k].includes("V")) continue;
            const runs = []; r[k].replace(/V+/g, (m, i) => runs.push([i, m.length]));
            const a = r[k].padEnd(w).split(""), b = r[k - 1].padEnd(w).split("");
            for (const [i, l] of runs) { for (let j = i; j < i + l; j++) a[j] = " "; for (let j = i - 1; j <= i + l; j++) if (b[j] === "#") b[j] = " "; }
            for (const [i, l] of runs) {
              const n = 2 + Math.floor(rnd() * 4), st = Math.max(1, Math.min(w - 1 - n, Math.round(i + l / 2 - n / 2)));
              for (let j = st; j < st + n; j++) a[j] = "V";
              for (let j = st - 1; j <= st + n; j++) b[j] = "#";
            }
            r[k] = a.join(""); r[k - 1] = b.join("");
          }
          return r.map((x) => x.padEnd(w)).join("|");
        };
        add(chase ? "#|#|#|#|#|#|# O    P |#########|#########" : "#|#|#|#|#|#|# P  |#####|#####");
        const count = Math.min(22, 8 + Math.floor(n / 14));
        let last = null;
        for (let k = 0; k < count; k++) {
          let c = zpool.length && rnd() < 0.55 ? (rnd() < 0.35 ? theme : zpool[Math.floor(rnd() * zpool.length)])
            : rnd() < 0.35 && pool.includes(theme) ? theme : pool[Math.floor(rnd() * pool.length)];
          if (c === last) { const src = zpool.includes(c) ? zpool : pool; c = src[(src.indexOf(c) + 1) % src.length]; }
          add(c[2].includes("V") ? clusterV(c[2]) : c[2]); last = c;
          if (k % 3 === 2) add(BREATHER_K);
        }
        add("||||||    G     |################|################");
        return rows;
      }
      const modOf = (i) => MODS[i] || "";
      const codeOf = (n) => ((n * 48271 + 40503) % 1048576).toString(36).toUpperCase().padStart(4, "0");
      let mod = "";
      const reached = new Set(TEST_ALL_OPEN ? Array.from({ length: TOTAL }, (_, k) => k) : [0]);
      const realReached = new Set([0]); // levels actually reached (saved locally even while TEST_ALL_OPEN fills `reached`)
      const addReached = (k) => { if (Number.isInteger(k) && k >= 0 && k < TOTAL) { reached.add(k); realReached.add(k); } };
      { const sv = lsRead(); if (sv && Array.isArray(sv.reached)) sv.reached.forEach(addReached); }
      let lsLastIdx = lsLast(lsRead()); // furthest level started; only bumpLast() raises it, deaths and restarts never lower it
      function bumpLast() { lsLastIdx = Math.max(lsLastIdx, levelIdx); }
      function lsSave() { // local copy of progress: reached levels, the furthest level started, its checkpoint
        realReached.add(levelIdx);
        const old = lsRead(), oldCp = old && old.cp && old.cp.lvl === lsLastIdx ? old.cp : null;
        const cp = cpActive && cpActive.lvl === levelIdx && levelIdx === lsLastIdx ? { lvl: cpActive.lvl, key: cpActive.key } : oldCp;
        lsWrite({ reached: [...realReached].sort((a, b) => a - b), last: lsLastIdx, cp });
      }

      /* ===== CrazyGames SDK v3 (optional): progress save and gameplay events; a no-op when the SDK is absent ===== */
      const SAVE_KEY = "nine_save";
      let sdkReady = false, sdkLoaded = false, saveLast = 0, saveTimer = 0, sdkPlaying = false;
      function sdk() { return window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK : null; }
      function sdkCall(fn) { const s = sdk(); if (!s || !sdkReady) return; try { const r = fn(s); if (r && r.catch) r.catch(() => {}); } catch (_) {} }
      function sdkWrite() {
        saveLast = Date.now(); saveTimer = 0;
        sdkCall((s) => s.data.setItem(SAVE_KEY, JSON.stringify({ reached: [...reached].sort((a, b) => a - b), deaths })));
      }
      function sdkSave() { // at most once per 2 s; a save asked for sooner runs when the 2 s are up
        lsSave();
        if (!sdkReady || saveTimer) return;
        const wait = 2000 - (Date.now() - saveLast);
        if (wait <= 0) sdkWrite(); else saveTimer = setTimeout(sdkWrite, wait);
      }
      function sdkGameplay() { // gameplayStart while a level is being played, gameplayStop on menu, pause or the end screen
        const on = (state === "play" || state === "dead") && !window.orientPaused;
        if (on === sdkPlaying) return;
        sdkPlaying = on; sdkCall((s) => (on ? s.game.gameplayStart() : s.game.gameplayStop()));
      }
      (async function sdkInit() {
        const s = sdk(); if (!s) return;
        try { await s.init(); sdkReady = true; } catch (_) { return; }
        try {
          const raw = s.data.getItem(SAVE_KEY), sv = raw ? JSON.parse(raw) : null;
          if (sv && typeof sv === "object") {
            if (Array.isArray(sv.reached)) sv.reached.forEach(addReached); // union with the local save
            if (Number.isFinite(sv.deaths) && sv.deaths >= 0) {
              deaths = Math.max(deaths, Math.floor(sv.deaths));
              document.getElementById("hudDeaths").textContent = T("Ölüm sayısı") + ": " + deaths;
            }
          }
        } catch (_) {}
        sdkLoaded = true;
        setInterval(sdkGameplay, 250);
      })();

      const DEATH_LINES = [
        "Bunu beklemiyordun, değil mi?", "Yine mi?", "Gözlüğünü taksaydın görürdün, nine.",
        "Zemin de yalan söyledi.", "Tecrübe puanı +1", "Torunların bunu görmesin.",
        "Baston bile seni bıraktı.", "Pes etmek yok!", "Bu sefer kesin olacaktı...",
        "Tuzak 1 – Nine 0",
      ];
      const NINE_GRUMBLES = ["Belim gitti!", "Bu dizlerle mi?", "Torunum bunu görse...", "Çayım soğudu!", "Ah şu romatizma!"];

      /* ===== Tunables ===== */
      const GRAV = 32, SPEED = 6, JUMP = 13.2, HW = 0.26, HH = 0.45;
      const ARROW_SPEED = 8.5, ARROW_RANGE = 12;

      /* ===== Renderer, scene, camera ===== */
      const canvas = document.getElementById("game");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isTouch }); // touch devices: no MSAA and at most 1.5x pixels
      renderer.setPixelRatio(Math.min(devicePixelRatio, isTouch ? 1.5 : 2));
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      camera.position.z = 20;
      let viewW = 18, viewH = 11;

      function resize() {
        const w = innerWidth, h = innerHeight, aspect = w / h;
        // landscape: wider view, a bit tighter vertically so the man stays big on short phones
        viewH = aspect >= 1 ? Math.max(9.6, Math.min(12, 20 / aspect)) : Math.max(11, 12 / aspect);
        viewW = viewH * aspect;
        camera.left = -viewW / 2; camera.right = viewW / 2;
        camera.top = viewH / 2; camera.bottom = -viewH / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
      addEventListener("resize", resize);
      addEventListener("orientationchange", () => setTimeout(resize, 250));
      resize();

      /* ===== Basement: near-black background ===== */
      const skyCanvas = document.createElement("canvas"); skyCanvas.width = 2; skyCanvas.height = 256;
      const skyTex = new THREE.CanvasTexture(skyCanvas); skyTex.encoding = THREE.sRGBEncoding;
      function paintSky(top, bottom) { // background gradient, repainted per zone
        const g = skyCanvas.getContext("2d"), grd = g.createLinearGradient(0, 0, 0, 256);
        grd.addColorStop(0, top); grd.addColorStop(1, bottom);
        g.fillStyle = grd; g.fillRect(0, 0, 2, 256); skyTex.needsUpdate = true;
      }
      paintSky("#050505", "#0d0c0b"); scene.background = skyTex;

      /* ===== Shared materials and geometry helpers ===== */
      const M = (color, extra) => new THREE.MeshBasicMaterial(Object.assign({ color }, extra || {}));
      const MAT = {
        dirt: M(0x3b3c3e), dirt2: M(0x343537), grass: M(0x56585b), tuft: M(0x6e3519), rust: M(0x5e2f17, { transparent: true, opacity: 0.55 }),
        water: M(0x1d3320, { transparent: true, opacity: 0.92 }), foam: M(0x4f6a35),
        spike: M(0x8a8f94), spikeDark: M(0x55595e), slit: M(0x0d0b0a),
        skin: M(0xf4c49c), skinDark: M(0xd99a72), shirt: M(0xd9d6cf), shorts: M(0x2f4f8e),
        shoe: M(0x3a2a20), black: M(0x111111), outline: M(0x5a3a28), shine: M(0xffffff, { transparent: true, opacity: 0.45 }),
        pole: M(0x7d7a75), flag: M(0x2fae5a), arrow: M(0x4a3020), arrowTip: M(0x8a8f94),
        fire: M(0xff8a00, { transparent: true }), fire2: M(0xffe14d, { transparent: true }),
        rope: M(0x8a7350), ropeKnot: M(0x5a4628), fray: M(0xc9bc9a), beam: M(0x3a2a1d),
        stone: M(0x6b6c6e), stoneDark: M(0x444548), crate: M(0x7a3a1a), crateDark: M(0x4f230e),
        saw: M(0xb4b9bf), spark: M(0xffe14d), cord: M(0x0a0a0a), socket: M(0x2a2826),
        // Nine (grandmother)
        nSkin: M(0xf0bf9e), nSkinD: M(0xd49478), nWrinkle: M(0xa8735a), nHair: M(0xf6f4ef), nHairD: M(0xc9c5bd),
        nScarf: M(0x3d6fb0), nScarfD: M(0x284f88), nFlower: M(0xf0a04b), nFlower2: M(0xec8db0),
        nCard: M(0x8f5e2c), nCardD: M(0x6a4320), nKnit: M(0xad7a3c), nBtn: M(0x3a2414), nBlouse: M(0xf1ece0),
        nZig: M(0xe3782c), nZig2: M(0x7c9a3a),
        nSkirt: M(0x3b2a20), nSkirtD: M(0x281c15), nStock: M(0xdcc9a2), nStockD: M(0xbba57d), nShoe: M(0x7a4826), nShoeD: M(0x4b2b15),
        nNose: M(0xe8877a), nNoseL: M(0xf6b3a3), nBrow: M(0x8d877e), nMouth: M(0x5a2a22), nSweat: M(0x9fdcf5), nEyeW: M(0xffffff),
        nCane: M(0x8b5a2b), nCaneL: M(0xb67d45), nCaneD: M(0x5a3818),
        nGlass: M(0x2a1f17), nLens: M(0xdfeef2, { transparent: true, opacity: 0.3 }), nBlush: M(0xe0705e, { transparent: true, opacity: 0.4 }),
        wood: M(0x7a5230), woodL: M(0xa47448), woodD: M(0x4e331c),
      };
      // Geometry cache: one shared geometry per shape and size (nothing mutates .geometry), so rebuilding a level allocates none
      const _geo = new Map();
      const geoOf = (k, make) => { let g = _geo.get(k); if (!g) { g = make(); g.userData.cached = true; _geo.set(k, g); } return g; };
      const pg = (w, h) => geoOf("p|" + w + "|" + h, () => new THREE.PlaneGeometry(w, h));
      const cg = (r) => geoOf("c|" + r, () => new THREE.CircleGeometry(r, 24));
      const box = (w, h, mat, x, y, z) => { const m = new THREE.Mesh(pg(w, h), mat); m.position.set(x || 0, y || 0, z || 0); return m; };
      const circle = (r, mat, x, y, z) => { const m = new THREE.Mesh(cg(r), mat); m.position.set(x || 0, y || 0, z || 0); return m; };
      const tri = (pts, mat, z) => {
        const m = new THREE.Mesh(geoOf("t|" + pts.join(","), () => {
          const s = new THREE.Shape(); s.moveTo(pts[0], pts[1]);
          for (let i = 2; i < pts.length; i += 2) s.lineTo(pts[i], pts[i + 1]);
          return new THREE.ShapeGeometry(s);
        }), mat); m.position.z = z || 0; return m;
      };
      // Per-level GPU resources: anything removed from the level is disposed unless it is cached or was made before the first level
      let _geoBase = Infinity, _matBase = Infinity;
      function markBase() { const g = new THREE.BufferGeometry(), m = new THREE.MeshBasicMaterial(); _geoBase = g.id; _matBase = m.id; g.dispose(); m.dispose(); }
      function freeObj(o, mats) {
        o.traverse((n) => {
          const g = n.geometry; if (g && !g.userData.cached && g.id > _geoBase) g.dispose();
          if (mats === false || !n.material) return;
          (Array.isArray(n.material) ? n.material : [n.material]).forEach((m) => { if (m.id > _matBase) m.dispose(); });
        });
      }

      /* ===== TNT barrel texture ===== */
      const tntTex = (function () {
        const c = document.createElement("canvas"); c.width = 128; c.height = 148;
        const g = c.getContext("2d");
        g.fillStyle = "#d62828"; g.beginPath(); if (g.roundRect) g.roundRect(8, 4, 112, 140, 18); else g.rect(8, 4, 112, 140); g.fill();
        g.fillStyle = "#7a1010"; g.fillRect(8, 26, 112, 10); g.fillRect(8, 112, 112, 10);
        g.fillStyle = "#ffffff"; g.font = "bold 40px Geist, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
        g.fillText("TNT", 64, 76);
        const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
      })();
      const tntMat = new THREE.MeshBasicMaterial({ map: tntTex, transparent: true });

      /* ===== Saw blade, chain and yellow-black stripe textures ===== */
      const langTex = []; // textures with TR/EN text, redrawn by window.relang
      function canvasTex(w, h, draw, lang) {
        const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"));
        const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
        if (lang) langTex.push({ c, draw, t });
        return t;
      }
      const stripeMat = new THREE.MeshBasicMaterial({ map: canvasTex(128, 20, (g) => {
        g.fillStyle = "#ffd60a"; g.fillRect(0, 0, 128, 20); g.fillStyle = "#1d1d1f";
        for (let x = -20; x < 140; x += 20) { g.beginPath(); g.moveTo(x, 20); g.lineTo(x + 10, 20); g.lineTo(x + 20, 0); g.lineTo(x + 10, 0); g.fill(); }
        g.fillRect(0, 0, 128, 2); g.fillRect(0, 18, 128, 2);
      }) });
      const CHAIN_L = 16;
      const chainTex = canvasTex(16, 32, (g) => { g.strokeStyle = "#4b5058"; g.lineWidth = 3; g.beginPath(); g.ellipse(8, 10, 4, 8, 0, 0, Math.PI * 2); g.stroke(); g.fillStyle = "#4b5058"; g.fillRect(7, 18, 2, 14); });
      chainTex.wrapS = chainTex.wrapT = THREE.RepeatWrapping; chainTex.repeat.set(1, CHAIN_L / 0.32);
      const chainMat = new THREE.MeshBasicMaterial({ map: chainTex, transparent: true });
      function sawMesh(r) {
        const g = new THREE.Group();
        for (let k = 0; k < 14; k++) { const a = (k * Math.PI * 2) / 14; g.add(tri([0.8 * r * Math.cos(a), 0.8 * r * Math.sin(a), r * Math.cos(a + 0.12), r * Math.sin(a + 0.12), 0.8 * r * Math.cos(a + 0.4), 0.8 * r * Math.sin(a + 0.4)], MAT.spikeDark, 0)); }
        g.add(circle(r * 0.86, MAT.saw, 0, 0, 0.01)); g.add(circle(r * 0.22, MAT.spikeDark, 0, 0, 0.02));
        g.add(box(r * 0.08, r * 1.2, MAT.spike, 0, 0, 0.015)); return g;
      }

      /* ===== Surprise traps: troll face, crusher block, bird, trap door flaps, fake-flag spikes ===== */
      const scareMat = new THREE.MeshBasicMaterial({ depthTest: false, depthWrite: false, map: canvasTex(640, 400, (g) => {
        const bg = g.createRadialGradient(320, 200, 40, 320, 200, 420);
        bg.addColorStop(0, "#3b0f2e"); bg.addColorStop(1, "#0b0610"); g.fillStyle = bg; g.fillRect(0, 0, 640, 400);
        g.fillStyle = "#2f7a1c"; // horns / pointy ears
        [[60, 120, 10, 10, 130, 60], [580, 120, 630, 10, 510, 60]].forEach((q) => { g.beginPath(); g.moveTo(q[0], q[1]); g.lineTo(q[2], q[3]); g.lineTo(q[4], q[5]); g.fill(); });
        g.fillStyle = "#5fbf3a"; g.beginPath(); g.ellipse(320, 215, 300, 205, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#4ea32e"; g.beginPath(); g.ellipse(320, 290, 250, 110, 0, 0, Math.PI * 2); g.fill();
        [200, 440].forEach((ex, i) => { // bulging eyes
          g.fillStyle = "#fff6c2"; g.beginPath(); g.ellipse(ex, 140, 74, 60, 0, 0, Math.PI * 2); g.fill();
          g.fillStyle = "#e01b1b"; g.beginPath(); g.arc(ex + (i ? -14 : 14), 146, 30, 0, Math.PI * 2); g.fill();
          g.fillStyle = "#000"; g.beginPath(); g.arc(ex + (i ? -14 : 14), 146, 13, 0, Math.PI * 2); g.fill();
          g.fillStyle = "#fff"; g.beginPath(); g.arc(ex + (i ? -24 : 4), 136, 6, 0, Math.PI * 2); g.fill();
          g.fillStyle = "#14320c"; g.save(); g.translate(ex, 72); g.rotate(i ? -0.35 : 0.35); g.fillRect(-85, -14, 170, 28); g.restore(); // angry brows
        });
        g.fillStyle = "#2c6b18"; g.beginPath(); g.ellipse(300, 210, 14, 10, 0, 0, Math.PI * 2); g.ellipse(340, 210, 14, 10, 0, 0, Math.PI * 2); g.fill();
        const mouth = () => { g.beginPath(); g.moveTo(90, 230); g.quadraticCurveTo(320, 300, 550, 230); g.quadraticCurveTo(320, 440, 90, 230); };
        mouth(); g.fillStyle = "#3a0710"; g.fill();
        g.save(); mouth(); g.clip(); g.fillStyle = "#c2304a"; g.beginPath(); g.ellipse(320, 350, 120, 40, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#fffbe8";
        const up = (x) => 230 + 37 * (1 - Math.pow((x - 320) / 230, 2)), lo = (x) => 230 + 107 * (1 - Math.pow((x - 320) / 230, 2));
        for (let x = 95; x < 545; x += 36) { g.beginPath(); g.moveTo(x, up(x) - 4); g.lineTo(x + 36, up(x + 36) - 4); g.lineTo(x + 18, up(x + 18) + 34); g.fill(); }
        for (let x = 150; x < 490; x += 40) { g.beginPath(); g.moveTo(x, lo(x) + 4); g.lineTo(x + 40, lo(x + 40) + 4); g.lineTo(x + 20, lo(x + 20) - 30); g.fill(); }
        g.restore(); g.lineWidth = 6; g.strokeStyle = "#14320c"; mouth(); g.stroke();
      }) });
      const scareFace = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), scareMat);
      scareFace.renderOrder = 20; scareFace.visible = false; scene.add(scareFace);
      let scareStart = 0, scareEnd = 0;
      function crusherMesh() {
        const g = new THREE.Group();
        g.add(box(0.12, CHAIN_L, chainMat, -0.45, CHAIN_L / 2 + 0.8, -0.01)); g.add(box(0.12, CHAIN_L, chainMat, 0.45, CHAIN_L / 2 + 0.8, -0.01));
        g.add(box(1.6, 1.6, MAT.stoneDark)); g.add(box(1.46, 1.46, MAT.stone, 0, 0, 0.01));
        g.add(box(1.6, 0.2, stripeMat, 0, -0.7, 0.02));
        [[-0.58, 0.58], [0.58, 0.58], [-0.58, -0.42], [0.58, -0.42]].forEach(([a, b]) => g.add(circle(0.06, MAT.stoneDark, a, b, 0.02)));
        g.add(tri([-0.45, 0.25, -0.12, 0.12, -0.45, 0.12], MAT.black, 0.02)); g.add(tri([0.45, 0.25, 0.12, 0.12, 0.45, 0.12], MAT.black, 0.02)); // frown
        g.add(box(0.5, 0.06, MAT.black, 0, -0.2, 0.02));
        return g;
      }
      // Ezici pressure button: red dome on a rusty riveted plate, softly glowing
      const btnMat = { plate: M(0x7a4426), plateD: M(0x4a2a18), red: M(0xd81e1e), redD: M(0x8e1010) };
      function pressButtonMesh() {
        const g = new THREE.Group(), dome = new THREE.Group();
        const glowMat = M(0xff3a2a, { transparent: true, opacity: 0.3 });
        const glow = circle(0.3, glowMat, 0, 0.1, -0.02); glow.scale.y = 0.6; g.add(glow);
        const d = circle(0.15, btnMat.red, 0, 0, 0); d.scale.y = 0.85; dome.add(d);
        const dd = circle(0.15, btnMat.redD, 0.02, -0.02, -0.005); dd.scale.y = 0.85; dome.add(dd);
        dome.add(circle(0.04, MAT.shine, -0.05, 0.06, 0.01));
        dome.position.set(0, 0.09, 0); g.add(dome);
        g.add(box(0.72, 0.13, btnMat.plateD, 0, 0.025, 0.03)); g.add(box(0.66, 0.09, btnMat.plate, 0, 0.03, 0.035));
        [-0.27, 0.27].forEach((rx) => g.add(circle(0.025, btnMat.plateD, rx, 0.03, 0.04)));
        g.userData = { dome, glowMat }; return g;
      }
      function birdMesh() {
        const g = new THREE.Group(), wings = [];
        const body = circle(0.26, MAT.black); body.scale.set(1.5, 0.8, 1); g.add(body);
        g.add(circle(0.17, MAT.black, 0.32, 0.1, 0.01));
        g.add(tri([0.45, 0.14, 0.72, 0.06, 0.45, 0.02], M(0xffa31a), 0.02));
        g.add(circle(0.06, MAT.shirt, 0.36, 0.15, 0.02)); g.add(circle(0.03, M(0xe01b1b), 0.38, 0.15, 0.03));
        g.add(tri([0.24, 0.24, 0.46, 0.22, 0.28, 0.3], MAT.black, 0.02)); // angry brow tuft
        g.add(tri([-0.36, 0, -0.66, 0.16, -0.62, -0.12], MAT.black, 0));
        [0.01, -0.01].forEach((z, i) => { const w = new THREE.Group(); w.add(tri([0, 0, -0.25, 0.55, 0.15, 0.05], i ? MAT.black : M(0x2a2a2e), 0)); w.position.set(0, 0.05, z ? 0.03 : -0.02); g.add(w); wings.push(w); });
        g.userData.wings = wings; return g;
      }
      function flagMesh() {
        const g = new THREE.Group();
        g.add(box(0.08, 2.6, MAT.pole, 0, 1.3, 0)); g.add(circle(0.08, MAT.flag, 0, 2.62, 0.01));
        g.add(tri([0.04, 2.5, 0.85, 2.2, 0.04, 1.9], MAT.flag, 0.01)); return g;
      }
      const fakeFlagMat = M(0xd9822b);
      function fakeFlagMesh() { // shorter pole, smaller mustard cloth
        const g = new THREE.Group();
        g.add(box(0.08, 1.7, MAT.pole, 0, 0.85, 0)); g.add(circle(0.08, fakeFlagMat, 0, 1.72, 0.01));
        g.add(tri([0.04, 1.6, 0.65, 1.375, 0.04, 1.15], fakeFlagMat, 0.01)); return g;
      }

      /* ===== Back walls (parallax): grimy concrete and tiles, then rusty pipes and chains ===== */
      function wallTex(draw, alpha) {
        const t = canvasTex(512, 512, (g) => { if (!alpha) { g.fillStyle = "#1a1918"; g.fillRect(0, 0, 512, 512); } draw(g); });
        t.wrapS = THREE.RepeatWrapping; return t;
      }
      const wallMat = new THREE.MeshBasicMaterial({ depthWrite: false, map: wallTex(bodrumWall) });
      function bodrumWall(g) {
        for (let i = 0; i < 260; i++) { // concrete blotches
          const v = 18 + Math.floor(Math.random() * 14); g.fillStyle = `rgba(${v},${v - 1},${v - 2},0.6)`;
          g.fillRect(Math.random() * 500, Math.random() * 230, 6 + Math.random() * 30, 4 + Math.random() * 18);
        }
        g.fillStyle = "#121110"; g.fillRect(0, 226, 512, 8); // tile ledge
        for (let y = 234; y < 512; y += 32) for (let x = 0; x < 512; x += 32) { // grimy tiles
          const v = 34 + Math.floor(Math.random() * 12), miss = Math.random() < 0.06;
          g.fillStyle = miss ? "#151413" : `rgb(${v},${v + 2},${v - 2})`; g.fillRect(x + 1, y + 1, 30, 30);
          if (!miss && Math.random() < 0.12) { g.strokeStyle = "#141312"; g.lineWidth = 1; g.beginPath(); g.moveTo(x + 4 + Math.random() * 10, y + 2); g.lineTo(x + 14 + Math.random() * 8, y + 16); g.lineTo(x + 10 + Math.random() * 16, y + 30); g.stroke(); }
        }
        const grime = g.createLinearGradient(0, 300, 0, 512); grime.addColorStop(0, "rgba(30,34,18,0)"); grime.addColorStop(1, "rgba(22,26,12,0.85)");
        g.fillStyle = grime; g.fillRect(0, 300, 512, 212);
        for (let i = 0; i < 9; i++) { // rust and water streaks
          const x = 20 + Math.random() * 470, w = 6 + Math.random() * 18, h = 80 + Math.random() * 260, s = g.createLinearGradient(0, 0, 0, h);
          s.addColorStop(0, "rgba(90,45,20,0.45)"); s.addColorStop(1, "rgba(90,45,20,0)"); g.fillStyle = s; g.fillRect(x, 0, w, h);
        }
      }
      const pipeMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, map: wallTex((g) => {
        const pipe = (x, y, w, h, vert) => {
          const p = vert ? g.createLinearGradient(x, 0, x + w, 0) : g.createLinearGradient(0, y, 0, y + h);
          p.addColorStop(0, "#2e1a10"); p.addColorStop(0.4, "#6a3a1e"); p.addColorStop(1, "#24140c"); g.fillStyle = p; g.fillRect(x, y, w, h);
          g.fillStyle = "rgba(130,60,25,0.6)";
          for (let i = 0; i < (vert ? h : w) / 14; i++) { const a = Math.random() * (vert ? h : w); g.fillRect(vert ? x + Math.random() * w * 0.7 : x + a, vert ? y + a : y + Math.random() * h * 0.7, 3 + Math.random() * 5, 2 + Math.random() * 4); }
        };
        pipe(0, 96, 512, 20, false);
        for (let x = 40; x < 512; x += 128) { g.fillStyle = "#3a2214"; g.fillRect(x, 90, 10, 32); }
        pipe(0, 150, 512, 10, false);
        pipe(372, 116, 18, 250, true); g.fillStyle = "#3a2214"; g.fillRect(366, 360, 30, 12);
        g.fillStyle = "rgba(80,40,18,0.5)"; g.fillRect(378, 372, 4, 40); // drip
        const chain = (x, len) => {
          g.strokeStyle = "#3c3d40"; g.lineWidth = 3;
          for (let y = 0; y < len; y += 14) { g.beginPath(); if ((y / 14) % 2) g.ellipse(x, y + 7, 2, 7, 0, 0, Math.PI * 2); else g.ellipse(x, y + 7, 5, 7, 0, 0, Math.PI * 2); g.stroke(); }
          g.beginPath(); g.arc(x, len + 10, 8, -Math.PI / 2, Math.PI * 0.9); g.stroke(); // hook
        };
        chain(120, 230); chain(250, 150); chain(470, 300);
      }, true) });
      const backWall = box(1, 1, wallMat), backPipes = box(1, 1, pipeMat);
      backWall.renderOrder = -2; backPipes.renderOrder = -1; scene.add(backWall, backPipes);
      const BACK_LAYERS = [[backWall, 0.3, -8], [backPipes, 0.55, -6]], _v3 = new THREE.Vector3(); // reused every frame
      let lightLevel = 1; // average bulb brightness, dims the walls when the bulbs flicker

      /* ===== Zones (mekanlar): 10 places, 5 levels each; looks only, gameplay unchanged =====
         bg: background/fog [top, bottom] · ground: [block, block alt, top lip] · light: bulb RGB (0–1)
         flick: how often bulbs flicker (1 = normal) · water: [water, foam] · wall: back-wall draw */
      const R = Math.random;
      const tiles = (g, y0, y1, s, a, b, grout) => { g.fillStyle = grout; g.fillRect(0, y0, 512, y1 - y0);
        for (let y = y0; y < y1; y += s) for (let x = 0; x < 512; x += s) { g.fillStyle = R() < 0.5 ? a : b; g.fillRect(x + 1, y + 1, s - 2, s - 2); } };
      const ZONES = [
        { name: "Bodrum", bg: ["#050505", "#0d0c0b"], ground: [0x3b3c3e, 0x343537, 0x56585b], light: [1, 0.83, 0.54], flick: 1,
          water: [0x1d3320, 0x4f6a35], wall: bodrumWall },
        { name: "Huzurevi", bg: ["#0a0c08", "#14120c"], ground: [0x4a3f33, 0x423829, 0x6e5c45], light: [1, 0.88, 0.5], flick: 0.8,
          water: [0x2a3a36, 0x6a7f70], wall(g) {
            g.fillStyle = "#28301f"; g.fillRect(0, 0, 512, 300); // faded green wallpaper
            for (let y = 16; y < 290; y += 32) for (let x = (y / 32) % 2 ? 16 : 0; x < 512; x += 32) {
              g.fillStyle = "#3a4630"; g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); g.fillStyle = "#5a4a30"; g.beginPath(); g.arc(x, y, 2, 0, 7); g.fill(); }
            g.fillStyle = "#24190f"; g.fillRect(0, 300, 512, 212); g.fillStyle = "#3a2a18"; g.fillRect(0, 294, 512, 10); // wainscot, dado rail
            [[80, 100, 64, 80], [330, 80, 80, 60]].forEach(([x, y, w, h]) => { // framed photos
              g.fillStyle = "#3e2c16"; g.fillRect(x - 6, y - 6, w + 12, h + 12); g.fillStyle = "#46423a"; g.fillRect(x, y, w, h);
              g.fillStyle = "#2a2620"; g.beginPath(); g.arc(x + w / 2, y + h * 0.42, h * 0.18, 0, 7); g.fill(); g.fillRect(x + w * 0.25, y + h * 0.66, w * 0.5, h * 0.34); });
            [[180, 360], [430, 360]].forEach(([x, y]) => { // radiators
              g.fillStyle = "#2c2a26"; g.fillRect(x, y, 70, 70); g.fillStyle = "#3e3b35"; for (let k = 4; k < 70; k += 11) g.fillRect(x + k, y + 4, 6, 62); });
          } },
        { name: "Hastane", bg: ["#050a0a", "#0b1412"], ground: [0x55625b, 0x4c5852, 0x9fb3a8], light: [0.6, 0.82, 1], flick: 2.2,
          water: [0x1f3a40, 0x7fb0b0], wall(g) {
            tiles(g, 0, 512, 32, "#34423c", "#2f3c36", "#1e2723"); // white-green tiles
            g.fillStyle = "#2a4a3a"; g.fillRect(0, 236, 512, 14);
            g.fillStyle = "#6e6e66"; g.fillRect(350, 60, 76, 76); g.fillStyle = "#8e1414"; g.fillRect(378, 70, 20, 56); g.fillRect(360, 88, 56, 20); // red cross sign
            g.fillStyle = "#121816"; g.fillRect(50, 400, 200, 14); g.fillRect(40, 388, 30, 14); // stretcher silhouette
            [70, 230].forEach((x) => { g.fillRect(x, 414, 6, 50); g.beginPath(); g.arc(x + 3, 470, 9, 0, 7); g.fill(); });
          } },
        { name: "Kasap", bg: ["#0c0606", "#140a0a"], ground: [0x58585b, 0x4f4f52, 0x8f8f92], light: [1, 0.32, 0.28], flick: 1,
          water: [0x4a1012, 0x8a2a2a], wall(g) {
            tiles(g, 0, 512, 32, "#3a3d40", "#35383b", "#222426"); // cold white tiles
            g.fillStyle = "#1a1a1c"; g.fillRect(0, 50, 512, 10); // hook rail
            [70, 190, 320, 440].forEach((x, i) => {
              g.strokeStyle = "#1a1a1c"; g.lineWidth = 4; g.beginPath(); g.moveTo(x, 60); g.lineTo(x, 110); g.arc(x - 8, 110, 8, 0, Math.PI); g.stroke();
              g.fillStyle = "#5a1e1e"; g.beginPath(); // cartoon ham / drumstick
              if (i % 2) g.ellipse(x, 160, 30, 46, 0, 0, 7); else g.ellipse(x, 150, 38, 34, 0, 0, 7); g.fill();
              g.fillStyle = "#7a3a34"; g.beginPath(); g.ellipse(x - 8, 145, 12, 16, 0, 0, 7); g.fill();
              g.fillStyle = "#8a8478"; g.fillRect(x - 4, i % 2 ? 200 : 180, 8, 22); g.beginPath(); g.arc(x, i % 2 ? 224 : 204, 7, 0, 7); g.fill();
            });
            g.fillStyle = "rgba(90,10,10,0.45)"; for (let k = 0; k < 6; k++) { g.beginPath(); g.ellipse(R() * 512, 420 + R() * 80, 14 + R() * 20, 5, 0, 0, 7); g.fill(); }
          } },
        { name: "Lunapark", bg: ["#0a0510", "#120a18"], ground: [0x4a2f4f, 0x412945, 0x7a4f82], light: [0.82, 0.45, 1], flick: 1.2,
          water: [0x2a1a45, 0x7a5aa8], wall(g) {
            for (let x = 0; x < 512; x += 32) { g.fillStyle = (x / 32) % 2 ? "#3a1428" : "#26183a"; g.fillRect(x, 0, 32, 512); } // tent stripes
            g.fillStyle = "#4a1a2e"; for (let x = 0; x < 512; x += 64) { g.beginPath(); g.arc(x + 32, 30, 32, 0, Math.PI); g.fill(); }
            [[60, 0.18], [160, 0.12]].forEach(([y, sag]) => { // bulb strings
              g.strokeStyle = "#141018"; g.lineWidth = 2; g.beginPath(); g.moveTo(0, y); g.quadraticCurveTo(128, y + 512 * sag, 256, y); g.quadraticCurveTo(384, y + 512 * sag, 512, y); g.stroke();
              for (let k = 0; k <= 16; k++) { const t = (k % 8) / 8, x = k * 32, yy = y + 2 * t * (1 - t) * 512 * sag + 6;
                g.fillStyle = k % 2 ? "#8a7a34" : "#7a3466"; g.beginPath(); g.arc(x, yy, 5, 0, 7); g.fill(); } });
            g.fillStyle = "#3a3020"; g.fillRect(300, 220, 120, 160); // clown poster
            g.fillStyle = "#8a8070"; g.beginPath(); g.arc(360, 290, 40, 0, 7); g.fill();
            g.fillStyle = "#7a2a3a"; [[318, 270], [402, 270]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 16, 0, 7); g.fill(); });
            g.fillStyle = "#111"; g.beginPath(); g.arc(346, 282, 6, 0, 7); g.arc(374, 282, 6, 0, 7); g.fill();
            g.fillStyle = "#a01818"; g.beginPath(); g.arc(360, 296, 8, 0, 7); g.fill(); g.fillRect(340, 312, 40, 5);
            g.fillStyle = "#8a7a50"; g.font = "bold 20px Geist, sans-serif"; g.textAlign = "center"; g.fillText(T("SİRK"), 360, 362);
          } },
        { name: "Kanalizasyon", bg: ["#040603", "#0a0e06"], ground: [0x33372c, 0x2d3127, 0x4f5a3c], light: [0.5, 1, 0.45], flick: 1,
          water: [0x2f4a12, 0x7aa020], wall(g) {
            g.fillStyle = "#14150d"; g.fillRect(0, 0, 512, 512);
            for (let y = 0; y < 512; y += 20) for (let x = (y / 20) % 2 ? -24 : 0; x < 512; x += 48) { // dark bricks
              const v = 30 + Math.floor(R() * 10); g.fillStyle = `rgb(${v},${v},${v - 10})`; g.fillRect(x + 2, y + 2, 44, 16); }
            [128, 384].forEach((x) => { // brick arches
              g.fillStyle = "#070805"; g.beginPath(); g.moveTo(x - 90, 512); g.lineTo(x - 90, 300); g.arc(x, 300, 90, Math.PI, 0); g.lineTo(x + 90, 512); g.fill();
              g.strokeStyle = "#383a24"; g.lineWidth = 14; g.beginPath(); g.moveTo(x - 97, 512); g.lineTo(x - 97, 300); g.arc(x, 300, 97, Math.PI, 0); g.lineTo(x + 97, 512); g.stroke(); });
            g.fillStyle = "#2a4410"; g.beginPath(); g.moveTo(0, 452); for (let x = 0; x <= 512; x += 32) g.quadraticCurveTo(x + 16, 444 + R() * 8, x + 32, 452); g.lineTo(512, 512); g.lineTo(0, 512); g.fill(); // sludge
            for (let k = 0; k < 10; k++) { const x = R() * 512, h = 60 + R() * 200, s = g.createLinearGradient(0, 0, 0, h); // drips
              s.addColorStop(0, "rgba(70,110,20,0.5)"); s.addColorStop(1, "rgba(70,110,20,0)"); g.fillStyle = s; g.fillRect(x, 0, 4 + R() * 6, h); }
          } },
        { name: "Fabrika", bg: ["#0a0603", "#140c06"], ground: [0x4a3a2c, 0x423326, 0x8a5a2a], light: [1, 0.6, 0.26], flick: 1,
          water: [0x2a2418, 0x6a5a30], wall(g) {
            for (let y = 0; y < 512; y += 128) for (let x = 0; x < 512; x += 128) { // orange metal panels
              g.fillStyle = "#20140a"; g.fillRect(x, y, 128, 128); g.fillStyle = R() < 0.5 ? "#3c2512" : "#352010"; g.fillRect(x + 3, y + 3, 122, 122);
              g.fillStyle = "#1a1008"; [[10, 10], [118, 10], [10, 118], [118, 118]].forEach(([a, b]) => { g.beginPath(); g.arc(x + a, y + b, 3, 0, 7); g.fill(); }); }
            [[110, 150, 54], [196, 214, 32], [400, 120, 40]].forEach(([x, y, r]) => { // gears
              g.fillStyle = "#1e140b"; for (let k = 0; k < 10; k++) { g.save(); g.translate(x, y); g.rotate((k * Math.PI) / 5); g.fillRect(-r * 0.16, -r - 8, r * 0.32, 16); g.restore(); }
              g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.fillStyle = "#3c2512"; g.beginPath(); g.arc(x, y, r * 0.3, 0, 7); g.fill(); });
            g.fillStyle = "#1a1008"; g.fillRect(0, 376, 512, 40); g.fillStyle = "#4a3010"; // conveyor stripes and rollers
            for (let x = -40; x < 540; x += 32) { g.beginPath(); g.moveTo(x, 412); g.lineTo(x + 16, 412); g.lineTo(x + 36, 380); g.lineTo(x + 20, 380); g.fill(); }
            g.fillStyle = "#14100a"; for (let x = 16; x < 512; x += 48) { g.beginPath(); g.arc(x, 428, 10, 0, 7); g.fill(); }
          } },
        { name: "Buzhane", bg: ["#04080c", "#0a1218"], ground: [0x52687a, 0x4a5f70, 0xb8d8ec], light: [0.72, 0.9, 1], flick: 0.8,
          water: [0x2a5a7a, 0xcfefff], wall(g) {
            const bg = g.createLinearGradient(0, 0, 0, 512); bg.addColorStop(0, "#1c2c3a"); bg.addColorStop(1, "#121c26"); g.fillStyle = bg; g.fillRect(0, 0, 512, 512);
            g.strokeStyle = "#2c4458"; g.lineWidth = 2; // ice block seams
            for (let y = 80; y < 512; y += 96) { g.beginPath(); g.moveTo(0, y); g.lineTo(512, y + R() * 12 - 6); g.stroke();
              for (let x = (y / 96) % 2 ? 60 : 0; x < 512; x += 120) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + 4, y + 96); g.stroke(); } }
            g.fillStyle = "#3e5c74"; for (let x = 0; x < 512; x += 18) { const h = 16 + R() * 60; g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 14, 0); g.lineTo(x + 7, h); g.fill(); } // icicles
            g.fillStyle = "rgba(220,240,255,0.12)"; for (let k = 0; k < 300; k++) g.fillRect(R() * 512, R() * 512, 2, 2); // frost
            [0, 512].forEach((x) => { const f = g.createRadialGradient(x, 512, 0, x, 512, 200); f.addColorStop(0, "rgba(220,240,255,0.18)"); f.addColorStop(1, "rgba(220,240,255,0)"); g.fillStyle = f; g.fillRect(0, 300, 512, 212); });
          } },
        { name: "Metro Tüneli", bg: ["#030303", "#0a0a08"], ground: [0x2e2e30, 0x28282a, 0x5a564a], light: [1, 0.9, 0.42], flick: 1,
          water: [0x1f2a22, 0x4a5a40], wall(g) {
            g.fillStyle = "#101010"; g.fillRect(0, 0, 512, 512);
            tiles(g, 120, 312, 24, "#262624", "#22221f", "#171716"); // station wall band
            g.fillStyle = "#1c2a5a"; g.fillRect(146, 150, 220, 44); g.strokeStyle = "#8a8a80"; g.lineWidth = 2; g.strokeRect(146, 150, 220, 44);
            g.fillStyle = "#c8c8c0"; g.font = "bold 22px Geist, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(T("NİNE DURAĞI"), 256, 173);
            ["#6a2a5a", "#2a6a5a", "#7a6a2a"].forEach((c, k) => { g.strokeStyle = c; g.lineWidth = 5; g.lineCap = "round"; // graffiti scribbles
              const x = [30, 400, 230][k]; g.beginPath(); g.moveTo(x, 270);
              for (let s = 0; s < 4; s++) g.bezierCurveTo(x + s * 22 + 10, 220 + R() * 30, x + s * 22 + 20, 300 - R() * 20, x + s * 22 + 28, 260 + R() * 20); g.stroke(); });
            g.fillStyle = "#24190f"; for (let x = 0; x < 512; x += 32) g.fillRect(x, 448, 18, 40); // sleepers and rails
            g.fillStyle = "#4a4a48"; g.fillRect(0, 452, 512, 5); g.fillRect(0, 478, 512, 5);
          } },
        { name: "Kukla'nın Stüdyosu", bg: ["#080203", "#100406"], ground: [0x3a1a1c, 0x321618, 0x6a2a2e], light: [1, 0.2, 0.2], flick: 1.4,
          water: [0x300a10, 0x7a1a24], wall(g) {
            for (let x = 0; x < 512; x += 32) { const c = g.createLinearGradient(x, 0, x + 32, 0); // red curtain folds
              c.addColorStop(0, "#3e0a10"); c.addColorStop(0.5, "#1c0406"); c.addColorStop(1, "#3e0a10"); g.fillStyle = c; g.fillRect(x, 0, 32, 512); }
            g.fillStyle = "#4a0c12"; g.fillRect(0, 0, 512, 30); for (let x = 0; x < 512; x += 64) { g.beginPath(); g.arc(x + 32, 30, 32, 0, Math.PI); g.fill(); }
            g.fillStyle = "#5a4418"; for (let x = 0; x < 512; x += 64) g.fillRect(x + 28, 58, 8, 10);
            [[0, 1], [512, -1]].forEach(([x, s]) => { g.fillStyle = "rgba(255,230,200,0.07)"; g.beginPath(); g.moveTo(x, 0); g.lineTo(x + s * 300, 512); g.lineTo(x + s * 120, 512); g.fill(); }); // spotlights
            g.fillStyle = "#0a0a0a"; g.fillRect(186, 110, 140, 190); // giant puppet poster
            g.strokeStyle = "#8a8478"; g.lineWidth = 1; [[222, 168], [290, 168], [256, 140]].forEach(([x, y]) => { g.beginPath(); g.moveTo(x, 110); g.lineTo(x, y); g.stroke(); }); // strings
            for (let k = 0; k < 6; k++) { g.fillStyle = k % 2 ? "#d8d0c2" : "#9a1018"; g.fillRect(208 + k * 16, 268, 16, 32); } // striped shirt
            g.fillStyle = "#7a5030"; g.beginPath(); g.ellipse(256, 200, 42, 50, 0, 0, 7); g.fill(); // wooden head
            g.strokeStyle = "#5a3820"; g.lineWidth = 2; [[232, 160, 228, 240], [276, 158, 282, 236], [256, 154, 252, 190]].forEach(([a, b, c, d]) => { g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo((a + c) / 2 + 8, (b + d) / 2, c, d); g.stroke(); }); // grain
            g.fillStyle = "#6a4426"; g.fillRect(228, 226, 56, 30); g.strokeStyle = "#2a160a"; g.lineWidth = 3; // hinged jaw
            g.beginPath(); g.moveTo(232, 226); g.lineTo(232, 254); g.moveTo(280, 226); g.lineTo(280, 254); g.stroke();
            g.fillStyle = "#e6dcc6"; g.beginPath(); g.ellipse(240, 192, 8, 6, 0, 0, 7); g.ellipse(272, 192, 8, 6, 0, 0, 7); g.fill();
            g.fillStyle = "#2a3a5a"; g.beginPath(); g.arc(241, 193, 3.5, 0, 7); g.arc(273, 193, 3.5, 0, 7); g.fill();
            g.fillStyle = "#0a0806"; g.beginPath(); g.moveTo(256, 222); g.quadraticCurveTo(236, 212, 222, 222); g.quadraticCurveTo(214, 214, 220, 208); // curly mustache
            g.quadraticCurveTo(212, 222, 226, 228); g.quadraticCurveTo(240, 224, 256, 226); g.quadraticCurveTo(272, 224, 286, 228);
            g.quadraticCurveTo(300, 222, 292, 208); g.quadraticCurveTo(298, 214, 290, 222); g.quadraticCurveTo(276, 212, 256, 222); g.fill();
            g.fillStyle = "#a8121b"; g.beginPath(); g.moveTo(236, 160); g.lineTo(242, 132); g.lineTo(270, 132); g.lineTo(276, 160); g.fill(); // fez
            g.strokeStyle = "#0a0a0a"; g.lineWidth = 3; g.beginPath(); g.moveTo(256, 132); g.quadraticCurveTo(272, 132, 274, 150); g.stroke();
            g.fillStyle = "#0a0a0a"; g.fillRect(271, 148, 6, 12); // tassel
            g.fillStyle = "#140608"; g.fillRect(0, 430, 512, 82); g.fillStyle = "#200a0c"; for (let x = 0; x < 512; x += 64) g.fillRect(x, 430, 2, 82); // stage boards
          } },
      ];
      const zoneTexCache = [];
      let zoneIdx = -1;
      const zoneOf = (i) => Math.min(ZONES.length - 1, Math.floor(i / 5));
      function applyZone(z) {
        if (z === zoneIdx) return; zoneIdx = z; const Z = ZONES[z];
        if (!zoneTexCache[z]) zoneTexCache[z] = z === 0 ? wallMat.map : wallTex(Z.wall);
        wallMat.map = zoneTexCache[z]; wallMat.needsUpdate = true;
        backPipes.visible = z === 0; // rusty pipes and chains belong to the basement
        paintSky(Z.bg[0], Z.bg[1]); scene.fog = z === 0 ? null : new THREE.Fog(Z.bg[1], 24, 70);
        MAT.dirt.color.setHex(Z.ground[0]); MAT.dirt2.color.setHex(Z.ground[1]); MAT.grass.color.setHex(Z.ground[2]);
        MAT.water.color.setHex(Z.water[0]); MAT.foam.color.setHex(Z.water[1]);
        document.getElementById("hudZone").textContent = T(Z.name);
      }

      /* ===== Hanging bulbs: soft additive glow, random flicker ===== */
      const glowTex = canvasTex(128, 128, (g) => {
        const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
        r.addColorStop(0, "rgba(255,255,255,0.7)"); r.addColorStop(0.3, "rgba(255,225,210,0.25)"); r.addColorStop(1, "rgba(255,225,210,0)"); // tinted per zone
        g.fillStyle = r; g.fillRect(0, 0, 128, 128);
      });
      let bulbs = [], statics = []; // statics: scenery whose matrices are frozen after the level is built
      const stat = (o) => { statics.push(o); return o; };
      function addBulb(x, y) {
        const L = ZONES[zoneIdx].light, bm = M(0xffd38a), gm = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
        gm.color.setRGB(L[0], L[1] * 0.98, L[2] * 0.95);
        level.add(stat(box(0.03, 12, MAT.cord, x, y + 6.1, -0.5)));
        level.add(stat(box(0.15, 0.16, MAT.socket, x, y + 0.14, -0.46)));
        level.add(stat(circle(0.11, bm, x, y - 0.03, -0.45)));
        const glow = box(6.5, 6.5, gm, x, y - 0.4, -0.6); glow.renderOrder = 0; level.add(stat(glow));
        bulbs.push({ x, bm, gm, mode: "steady", t: rnd(1, 4), k: 1 });
      }
      function updateBulbs(dt) {
        let sum = 0;
        for (const b of bulbs) {
          b.t -= dt;
          if (b.t <= 0) {
            const r = Math.random();
            if (b.mode !== "steady") { b.mode = "steady"; b.t = rnd(1.2, 5) / ZONES[zoneIdx].flick; }
            else if (r < 0.65) { b.mode = "flicker"; b.t = rnd(0.15, 0.5); }
            else { b.mode = "off"; b.t = rnd(0.4, 1.6); if (Math.abs(b.x - camX) < viewW / 2) SFX.tick(); }
          }
          b.k = b.mode === "off" ? 0.04 : b.mode === "flicker" ? (Math.random() < 0.5 ? 0.12 : 1) : 0.9 + Math.random() * 0.1;
          const L = ZONES[zoneIdx].light; b.bm.color.setRGB(b.k * L[0], b.k * L[1], b.k * L[2]); b.gm.opacity = b.k;
          sum += Math.abs(b.x - camX) < viewW ? b.k : 0.95;
        }
        lightLevel = bulbs.length ? sum / bulbs.length : 1;
      }

      /* ===== Player model: Nine, a chubby hunched grandmother with a cane (same hitbox) ===== */
      const arc = (r, mat, t0, tl, x, y, z) => { const m = new THREE.Mesh(geoOf("a|" + r + "|" + t0 + "|" + tl, () => new THREE.CircleGeometry(r, 20, t0, tl)), mat); m.position.set(x || 0, y || 0, z || 0); return m; };
      const ring = (r0, r1, mat, x, y, z, t0, tl) => { const m = new THREE.Mesh(geoOf("r|" + r0 + "|" + r1 + "|" + (t0 || 0) + "|" + (tl || 0), () => new THREE.RingGeometry(r0, r1, 20, 1, t0 || 0, tl || Math.PI * 2)), mat); m.position.set(x || 0, y || 0, z || 0); return m; };
      const rbox = (w, h, mat, x, y, z, r) => { const m = box(w, h, mat, x, y, z); m.rotation.z = r || 0; return m; };
      const zig = (x0, x1, y, amp, n, t, mat, z) => { // a zigzag stripe from x0 to x1 around y
        const top = [], bot = [];
        for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, yy = y + (i % 2 ? amp : -amp); top.push(x, yy + t / 2); bot.unshift(x, yy - t / 2); }
        return tri(top.concat(bot), mat, z);
      };
      const CANE_L = 0.385, SHOULDER_Y = 0.55, ARM_L = 0.22, LEAN = -0.78, HEAD_R = 0.62, KNEE = -0.13;
      function makeHead() { // face looks toward +x; origin at the head's centre
        const g = new THREE.Group(), bun = new THREE.Group();
        bun.add(circle(0.068, MAT.nHairD)); bun.add(circle(0.058, MAT.nHair, 0.004, 0.004, 0.005));
        bun.add(rbox(0.07, 0.008, MAT.nHairD, 0, 0.012, 0.01, 0.5)); bun.add(rbox(0.06, 0.008, MAT.nHairD, 0.004, -0.014, 0.01, -0.3));
        bun.position.set(-0.07, 0.092, -0.01); g.add(bun); // white bun peeking out on top of the scarf
        g.add(circle(0.138, MAT.nSkin));
        g.add(circle(0.062, MAT.nSkin, 0.06, -0.095, 0.002)); // soft double chin
        g.add(arc(0.146, MAT.nHair, 0.75, 3.4, 0, 0.004, 0.006)); // white hair under the scarf
        [[0.05, 0.1, 0.03], [0.03, 0.062, 0.026], [0.036, 0.028, 0.019]].forEach(([x, y, r]) => g.add(circle(r, MAT.nHair, x, y, 0.008))); // white hair at the temple
        g.add(rbox(0.04, 0.006, MAT.nHairD, 0.045, 0.085, 0.0085, -0.9));
        // blue headscarf with pink and orange flower dots, tied under the chin
        g.add(arc(0.16, MAT.nScarf, 1.15, 2.75, 0, 0.004, 0.01));
        g.add(arc(0.16, MAT.nScarfD, 1.15, 0.1, 0, 0.004, 0.011)); // folded front edge
        [[0.03, 0.14], [-0.03, 0.11], [-0.09, 0.11], [0.0, 0.07], [-0.06, 0.05], [-0.13, 0.05], [-0.04, -0.005], [-0.1, -0.02], [-0.13, -0.07]].forEach(([x, y], i) => {
          const fm = i % 2 ? MAT.nFlower2 : MAT.nFlower;
          [[0.008, 0], [-0.008, 0], [0, 0.008], [0, -0.008]].forEach(([dx, dy]) => g.add(circle(0.0065, fm, x + dx, y + dy, 0.014)));
          g.add(circle(0.004, MAT.nBlouse, x, y, 0.015));
        });
        g.add(tri([-0.13, -0.02, -0.03, -0.07, 0.04, -0.13, 0.06, -0.16, 0.03, -0.17, -0.1, -0.1], MAT.nScarf, 0.016)); // band down the cheek
        g.add(circle(0.007, MAT.nFlower2, -0.07, -0.08, 0.017)); g.add(circle(0.007, MAT.nFlower, 0.0, -0.12, 0.017));
        g.add(tri([0.05, -0.15, 0.1, -0.215, 0.07, -0.225], MAT.nScarf, 0.017)); // knot ends
        g.add(tri([0.05, -0.15, 0.015, -0.22, 0.045, -0.23], MAT.nScarfD, 0.017));
        g.add(circle(0.006, MAT.nFlower, 0.075, -0.2, 0.018));
        g.add(circle(0.027, MAT.nScarfD, 0.05, -0.15, 0.019)); g.add(circle(0.018, MAT.nScarf, 0.052, -0.148, 0.02)); // blue knot
        // comic face: frown, blush, wrinkles
        g.add(circle(0.032, MAT.nBlush, 0.06, -0.042, 0.011));
        g.add(ring(0.016, 0.025, MAT.nMouth, 0.095, -0.092, 0.013, 0.35, 2.45)); // downturned mouth
        g.add(rbox(0.045, 0.005, MAT.nWrinkle, 0.1, -0.04, 0.012, 1.05)); // nose-to-mouth fold
        g.add(rbox(0.035, 0.005, MAT.nWrinkle, 0.06, -0.08, 0.012, 0.6)); // jowl
        g.add(rbox(0.02, 0.005, MAT.nWrinkle, 0.022, 0.028, 0.012, 0.4)); // crow's feet
        g.add(rbox(0.02, 0.005, MAT.nWrinkle, 0.022, 0.006, 0.012, -0.3));
        // determined eye under a furrowed brow, big round glasses
        g.add(circle(0.02, MAT.nEyeW, 0.1, 0.012, 0.0125));
        g.add(circle(0.011, MAT.black, 0.107, 0.01, 0.013));
        g.add(rbox(0.042, 0.007, MAT.nWrinkle, 0.1, 0.032, 0.0135, -0.4)); // angry lid
        g.add(circle(0.06, MAT.nLens, 0.095, 0.016, 0.014));
        g.add(ring(0.05, 0.064, MAT.nGlass, 0.095, 0.016, 0.015));
        g.add(rbox(0.09, 0.01, MAT.nGlass, -0.01, 0.026, 0.009, 0.06)); // temple arm, tucked under the scarf
        g.add(rbox(0.02, 0.009, MAT.nGlass, 0.165, 0.018, 0.015)); // bridge
        g.add(rbox(0.066, 0.017, MAT.nBrow, 0.1, 0.078, 0.017, -0.45)); // brow slanting down to the nose
        g.add(rbox(0.024, 0.005, MAT.nWrinkle, 0.138, 0.07, 0.016, 1.2)); // furrow
        const nose = circle(0.045, MAT.nNose, 0.15, -0.03, 0.0145); nose.scale.set(1, 1.05, 1); g.add(nose); // big rosy nose
        g.add(circle(0.012, MAT.nNoseL, 0.158, -0.014, 0.0146));
        // sweat drop flying off the forehead
        g.add(circle(0.013, MAT.nSweat, 0.168, 0.092, 0.018)); g.add(tri([0.156, 0.096, 0.162, 0.124, 0.18, 0.096], MAT.nSweat, 0.018));
        g.add(circle(0.004, MAT.nEyeW, 0.164, 0.094, 0.019));
        return { g, bun };
      }
      function makeTorso() { // origin at the hips; leaned forward by LEAN for the hunch
        const g = new THREE.Group();
        g.add(circle(0.155, MAT.nCardD, -0.06, 0.2)); // hunched upper back
        const body = circle(0.2, MAT.nCard, 0.0, 0.1, 0.005); body.scale.set(1.05, 1, 1); g.add(body);
        g.add(circle(0.14, MAT.nCard, -0.05, 0.2, 0.006));
        g.add(circle(0.15, MAT.nCard, 0.07, 0.02, 0.006)); // plump belly
        g.add(rbox(0.34, 0.04, MAT.nCardD, 0.01, -0.09, 0.007)); // ribbed hem
        for (let i = -3; i <= 3; i++) g.add(rbox(0.012, 0.04, MAT.nKnit, i * 0.045 + 0.01, -0.09, 0.008));
        // knitted pattern: two orange-green zigzag bands and rows of small chevrons
        [[0.14, -0.17, 0.17], [-0.02, -0.15, 0.19]].forEach(([y, x0, x1]) => {
          g.add(rbox(x1 - x0, 0.058, MAT.nCardD, (x0 + x1) / 2, y, 0.0075));
          g.add(zig(x0, x1, y, 0.013, 12, 0.012, MAT.nZig, 0.008));
          for (let i = 0; i < 12; i++) g.add(circle(0.006, MAT.nZig2, x0 + (x1 - x0) * (i + 0.5) / 12, y + (i % 2 ? -0.017 : 0.017), 0.008));
        });
        [[-0.1, 0.06], [-0.02, 0.06], [0.06, 0.06], [-0.08, 0.225], [0.0, 0.225], [-0.05, -0.07], [0.04, -0.07], [0.12, 0.06]].forEach(([x, y]) =>
          g.add(tri([x - 0.016, y + 0.011, x, y - 0.005, x + 0.016, y + 0.011, x + 0.016, y + 0.004, x, y - 0.012, x - 0.016, y + 0.004], MAT.nKnit, 0.009)));
        g.add(rbox(0.024, 0.32, MAT.nCardD, 0.17, 0.08, 0.009, 0.12)); // button band at the front
        [-0.04, 0.04, 0.12, 0.2].forEach((y) => { const bx = 0.17 - (y - 0.08) * 0.12; g.add(circle(0.013, MAT.nBtn, bx, y, 0.01)); g.add(circle(0.004, MAT.nKnit, bx - 0.003, y + 0.003, 0.011)); });
        g.add(rbox(0.06, 0.035, MAT.nCardD, 0.06, -0.02, 0.009, 0.05)); // pocket
        g.add(tri([0.06, 0.28, 0.16, 0.26, 0.11, 0.21], MAT.nBlouse, 0.01)); // blouse collar
        g.add(rbox(0.06, 0.08, MAT.nSkin, 0.1, 0.3, -0.01, -0.3)); // neck
        g.position.set(0, 0.42, 0.07); g.rotation.z = LEAN;
        return g;
      }
      function makeSkirt() { // long dark skirt, absolute coordinates from hem to waist
        const g = new THREE.Group();
        g.add(tri([-0.2, 0.12, -0.1, 0.104, 0.06, 0.104, 0.22, 0.12, 0.14, 0.44, -0.16, 0.44], MAT.nSkirt, 0));
        g.add(tri([-0.04, 0.4, -0.08, 0.108, -0.06, 0.106], MAT.nSkirtD, 0.002));
        g.add(tri([0.06, 0.4, 0.1, 0.11, 0.12, 0.112], MAT.nSkirtD, 0.002));
        g.add(rbox(0.41, 0.022, MAT.nSkirtD, 0.01, 0.118, 0.003));
        g.position.z = 0.05; return g;
      }
      function makeLeg() { // beige sock and a brown slipper; pivot at the knee under the skirt
        const g = new THREE.Group();
        g.add(box(0.09, 0.2, MAT.nStock, 0, -0.08)); g.add(box(0.02, 0.2, MAT.nStockD, -0.035, -0.08, 0.001));
        [-0.02, -0.05].forEach((y) => g.add(box(0.09, 0.006, MAT.nStockD, 0, y, 0.001))); // sock ribs
        g.add(box(0.15, 0.06, MAT.nShoe, 0.025, -0.183, 0.005)); g.add(circle(0.032, MAT.nShoe, 0.1, -0.183, 0.005));
        g.add(rbox(0.06, 0.008, MAT.nShoeD, 0.06, -0.158, 0.006, -0.15)); // slipper opening
        g.add(box(0.17, 0.016, MAT.nShoeD, 0.03, -0.207, 0.006));
        return g;
      }
      function makeArm(back) { // knitted cardigan sleeve with a zigzag band, cuff, hand; pivot at the shoulder
        const g = new THREE.Group();
        g.add(circle(0.05, back ? MAT.nCardD : MAT.nCard));
        g.add(box(0.085, 0.19, back ? MAT.nCardD : MAT.nCard, 0, -0.09));
        if (!back) { g.add(box(0.085, 0.034, MAT.nCardD, 0, -0.11, 0.0005)); g.add(zig(-0.0425, 0.0425, -0.11, 0.008, 5, 0.009, MAT.nZig, 0.001)); }
        g.add(box(0.092, 0.03, back ? MAT.nCardD : MAT.nKnit, 0, -0.18, 0.001));
        g.add(circle(0.04, back ? MAT.nSkinD : MAT.nSkin, 0.005, -0.22, 0.02));
        return g;
      }
      function makeCane() { // curved wooden cane: origin at the handle, shaft points down
        const g = new THREE.Group();
        g.add(box(0.03, CANE_L, MAT.nCane, 0, -CANE_L / 2)); g.add(box(0.008, CANE_L - 0.03, MAT.nCaneL, -0.007, -CANE_L / 2, 0.001));
        g.add(ring(0.028, 0.056, MAT.nCane, 0.042, 0, 0, 0, Math.PI)); g.add(ring(0.036, 0.044, MAT.nCaneL, 0.042, 0, 0.001, 0.3, Math.PI - 0.6));
        g.add(box(0.028, 0.04, MAT.nCane, 0.084, -0.016)); g.add(circle(0.014, MAT.nCane, 0.084, -0.036));
        g.add(box(0.034, 0.03, MAT.nCaneD, 0, -CANE_L + 0.005, 0.002)); // worn tip
        g.add(box(0.034, 0.01, MAT.nCaneD, 0, -0.06, 0.002));
        return g;
      }
      const player = new THREE.Group();
      // visual-only base scale: Nine's parts sit in nineBody (x1.25); player keeps its per-frame face flip and squash/stretch, and the hitbox is unchanged
      const NINE_S = 1.25, NINE_SOLE = -0.028; // NINE_SOLE: lowest point of the slippers at rest, in model units
      const nineBody = new THREE.Group();
      nineBody.scale.setScalar(NINE_S); nineBody.position.y = NINE_SOLE * (1 - NINE_S); // soles stay where they were; x stays centred on the hitbox
      player.add(nineBody);
      const legL = makeLeg(), legR = makeLeg(), armF = makeArm(false), armB = makeArm(true);
      legR.position.set(-0.03, 0.2, 0.01); legL.position.set(0.06, 0.2, 0.03); nineBody.add(legR, legL);
      nineBody.add(makeSkirt());
      const torso = makeTorso(); nineBody.add(torso);
      const headParts = makeHead(), head = headParts.g, bun = headParts.bun;
      head.position.set(0.13, 0.33, 0.02); head.rotation.z = HEAD_R; torso.add(head);
      armB.position.set(0.15, SHOULDER_Y, 0.03); armB.visible = false; nineBody.add(armB); // far arm: only shown with the torch, behind the torso
      armF.position.set(0.2, SHOULDER_Y, 0.2); nineBody.add(armF);
      const cane = makeCane(); cane.position.set(0.005, -ARM_L, 0.01); armF.add(cane);
      const caneMid = new THREE.Object3D(); caneMid.position.y = -CANE_L / 2; cane.add(caneMid);
      // flashlight (fener) in the free hand, only shown in dark levels; kept pointing forward
      const torch = new THREE.Group();
      torch.add(box(0.12, 0.042, MAT.socket, 0.03, 0)); torch.add(box(0.12, 0.01, MAT.spikeDark, 0.03, 0.012, 0.001));
      torch.add(box(0.045, 0.066, MAT.socket, 0.108, 0, 0.002)); torch.add(box(0.01, 0.056, MAT.fire2, 0.133, 0, 0.003));
      torch.position.set(0.005, -ARM_L, 0.01); torch.visible = false; armB.add(torch);
      let bunO = 0, bunV = 0, lastVy = 0, planted = true, ageT = 0, dipT = 0, wobT = 0, beamA = -0.1;
      player.position.z = 2;
      scene.add(player);

      /* ===== Darkness overlay: black everywhere but a flashlight cone ahead of Nine and a dim glow at her feet ===== */
      const darkMat = M(0x000000, { depthTest: false });
      const DK = 30, DPX = 768, TPX = DPX / DK; // hole plane in tiles, texture px, px per tile
      const holeMat = new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, map: canvasTex(DPX, DPX, (g) => {
        const c = DPX / 2;
        g.fillStyle = "#000"; g.fillRect(0, 0, DPX, DPX);
        g.globalCompositeOperation = "destination-out";
        // dim glow, ~1.5 tiles, centred on her
        const r = g.createRadialGradient(c, c, 0, c, c, 2 * TPX);
        r.addColorStop(0, "rgba(0,0,0,0.8)"); r.addColorStop(0.5, "rgba(0,0,0,0.7)"); r.addColorStop(0.75, "rgba(0,0,0,0.35)"); r.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = r; g.fillRect(0, 0, DPX, DPX);
        // flashlight cone: ~60 degrees wide, ~7 tiles long, soft edges from stacked wedges
        const ax = c + 0.3 * TPX, R = 7.5 * TPX;
        const cg = g.createRadialGradient(ax, c, 0, ax, c, R);
        cg.addColorStop(0, "rgba(0,0,0,1)"); cg.addColorStop(0.55, "rgba(0,0,0,0.95)"); cg.addColorStop(0.85, "rgba(0,0,0,0.4)"); cg.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = cg; g.globalAlpha = 0.4;
        for (let d = 36; d >= 24; d -= 2) { const h = (d * Math.PI) / 180; g.beginPath(); g.moveTo(ax, c); g.arc(ax, c, R, -h, h); g.closePath(); g.fill(); }
      }) });
      const dark = new THREE.Group();
      const hole = box(DK, DK, holeMat); dark.add(hole);
      [[-109.99, 0, 200, 200], [109.99, 0, 200, 200], [0, 109.99, 20, 200], [0, -109.99, 20, 200]].forEach(([x, y, w, h]) => dark.add(box(w, h, darkMat, x, y)));
      dark.children.forEach((m) => (m.renderOrder = 10));
      dark.visible = false; scene.add(dark);
      let warnT = 0;

      /* ===== Game state ===== */
      const level = new THREE.Group(); scene.add(level);
      let grid, H, W, levelIdx = 0, deaths = 0, state = "menu";
      let p, fakes, spikes, launchers, triggers, arrows, barrels, flag, fx, deadTimer, walkT = 0;
      let ropes = [], bits = [], balls = [], crates = [], slowT = 0, shakeT = 0, dieT = 0, camX = 0;
      let saws = [], plats = [], lt = 0, hitT = 0, look = 0, stepPh = 0, bears = [], blades = [];
      let surprises = [], crushers = [], birds = [], doors = {}, doorCols = {}, flaps = [], spikeWalls = [];
      let crateBlocks = {}; // "cx,cy" tiles filled by a dropped crane crate
      /* ===== Checkpoints (ж): rocking chair + knitted blanket; lamp lights on first touch, death respawns there ===== */
      let checkpoints = [], cpActive = null, cpSpawn = null, cpT = 0; // cpActive: { lvl, key } survives restarts of the same level
      const CPM = {
        wood: M(0x9a6233), woodD: M(0x6b3f1d), yarn: M(0xc8553d), yarn2: M(0xf2d38a), yarn3: M(0x4f7fae),
        pole: M(0x3a3a3c), shadeOff: M(0xb9ab8e), shadeOn: M(0xffd27a), bulb: M(0xfff1c4),
        glow: M(0xffc35a, { transparent: true, opacity: 0.22, depthWrite: false }),
        glow2: M(0xffb347, { transparent: true, opacity: 0.1, depthWrite: false }),
      };
      function checkpointMesh() { // origin at the floor's top, tile middle; chair faces +x, lamp stands to its right
        const g = new THREE.Group(), chair = new THREE.Group();
        const glow = new THREE.Group();
        glow.add(circle(0.75, CPM.glow2, 0.34, 1.02, -0.05)); glow.add(circle(0.42, CPM.glow, 0.34, 1.02, -0.04));
        const pool = circle(0.55, CPM.glow, 0.1, 0.02, -0.03); pool.scale.y = 0.18; glow.add(pool);
        glow.visible = false; g.add(glow);
        // rockers: a long runner with upturned tips
        chair.add(box(0.74, 0.06, CPM.woodD, 0, 0.04, 0));
        [[-0.4, 0.09, 0.45], [0.4, 0.09, -0.45]].forEach(([a, b, rz]) => { const t = box(0.16, 0.06, CPM.woodD, a, b, 0); t.rotation.z = rz; chair.add(t); });
        chair.add(box(0.06, 0.34, CPM.wood, -0.24, 0.23, 0.01)); chair.add(box(0.06, 0.34, CPM.wood, 0.22, 0.23, 0.01)); // legs
        chair.add(box(0.62, 0.08, CPM.wood, -0.01, 0.42, 0.02)); // seat
        const back = new THREE.Group(); back.position.set(-0.29, 0.42, 0.01); back.rotation.z = 0.14; // backrest leans back
        back.add(box(0.07, 0.78, CPM.woodD, 0, 0.39, 0)); back.add(box(0.07, 0.07, CPM.wood, 0, 0.8, 0.01));
        [0.2, 0.4, 0.6].forEach((yy) => back.add(box(0.05, 0.03, CPM.wood, 0.03, yy, 0.01)));
        chair.add(back);
        chair.add(box(0.05, 0.2, CPM.wood, 0.2, 0.54, 0.02)); chair.add(box(0.46, 0.05, CPM.wood, -0.02, 0.65, 0.02)); // armrest
        // knitted blanket draped over the back, across the seat, hanging off the front
        const bl = new THREE.Group(); bl.position.z = 0.04;
        const drape = box(0.22, 0.56, CPM.yarn, -0.24, 0.72, 0); drape.rotation.z = 0.14; bl.add(drape);
        bl.add(box(0.44, 0.1, CPM.yarn, -0.04, 0.48, 0)); bl.add(box(0.16, 0.34, CPM.yarn, 0.12, 0.33, 0));
        [[-0.25, 0.88], [-0.23, 0.72], [-0.21, 0.56]].forEach(([a, b]) => { const s = box(0.2, 0.035, CPM.yarn2, a, b, 0.01); s.rotation.z = 0.14; bl.add(s); });
        bl.add(box(0.44, 0.03, CPM.yarn2, -0.04, 0.48, 0.01)); bl.add(box(0.16, 0.03, CPM.yarn2, 0.12, 0.3, 0.01));
        for (let k = 0; k < 3; k++) bl.add(box(0.025, 0.06, CPM.yarn3, 0.06 + k * 0.06, 0.14, 0.01)); // fringe
        chair.add(bl);
        g.add(chair);
        // small floor lamp
        g.add(box(0.2, 0.04, CPM.pole, 0.36, 0.02, 0)); g.add(box(0.03, 0.92, CPM.pole, 0.36, 0.48, 0));
        const bulb = circle(0.06, CPM.shadeOff, 0.36, 0.94, 0.005); g.add(bulb);
        const shade = tri([0.24, 0.96, 0.48, 0.96, 0.36, 1.18], CPM.shadeOff, 0.01); g.add(shade);
        const shade2 = box(0.18, 0.08, CPM.shadeOff, 0.36, 1.0, 0.01); g.add(shade2);
        g.userData = { chair, glow, shade, shade2, bulb };
        return g;
      }
      function cpLight(ck) {
        ck.lit = true; const u = ck.mesh.userData;
        u.glow.visible = true; u.shade.material = CPM.shadeOn; u.shade2.material = CPM.shadeOn; u.bulb.material = CPM.bulb;
      }
      function updateCheckpoints(dt) {
        for (const ck of checkpoints) {
          if (ck.lit) { const u = ck.mesh.userData, t = performance.now() / 1000; u.chair.rotation.z = Math.sin(t * 1.6 + ck.x) * 0.05; u.glow.scale.setScalar(1 + Math.sin(t * 2.3 + ck.x) * 0.03); }
          if (state !== "play" || !p) continue;
          if (p.x < ck.x - 1.0 || p.y - HH < ck.y - 1 || p.y - HH > ck.y + 5) continue; // reached or passed it, even mid-jump
          if (!cpActive || cpActive.lvl !== levelIdx) { cpActive = { lvl: levelIdx, key: ck.key }; lsSave(); }
          else if (cpActive.key !== ck.key) {
            if (parseFloat(ck.key) <= parseFloat(cpActive.key)) continue; // never move the respawn back
            cpActive = { lvl: levelIdx, key: ck.key }; lsSave();
          }
          if (ck.lit) continue;
          cpLight(ck);
          tone("sine", 784, 784, 0.7, 0.07); tone("sine", 1175, 1175, 0.9, 0.05, 0.12); tone("triangle", 1568, 1568, 0.6, 0.02, 0.24); // soft chime
          clearTimeout(cpT); toast.textContent = T("Kontrol noktası!"); toast.classList.add("is-on");
          cpT = setTimeout(() => { if (state === "play" && toast.textContent === T("Kontrol noktası!")) toast.classList.remove("is-on"); }, 1500);
        }
      }

      const tile = (cx, cy) => { const r = H - 1 - cy; if (r < 0 || r >= H || cx < 0) return " "; return grid[r][cx] || " "; };
      const isGroundChar = (t) => t === "#" || t === "A" || t === "F" || t === "u";
      function solid(cx, cy) {
        const t = tile(cx, cy);
        const d = doors[cx + "," + cy]; if (d && d.open) return false;
        if (crateBlocks[cx + "," + cy]) return true;
        if (t === "#" || t === "A" || t === "1") return true; // 1: the mirror that looks like an open gap
        if (t === "F" || t === "u" || t === ";" || t === "İ") return !fakes[cx + "," + cy].fallen;
        if (t === "'" || t === "ö") { const sd = stageOpen[cx + "," + cy]; return !(sd && sd.open); } // stage trapdoor
        return false;
      }
      const overlap = (ax, ay, aw, ah, bx, by, bw, bh) => Math.abs(ax - bx) < aw + bw && Math.abs(ay - by) < ah + bh;

      /* ===== Huzurevi traps: wheelchair, chattering teeth, knitting basket, wet floor, flowerpot, rug ===== */
      let chairs = [], chompers = [], baskets = [], needles = [], pots = [], rugs = [];
      const HM = {
        tyre: M(0x1f1f22), rim: M(0x9aa0a6), seat: M(0x3f5f8a), seatD: M(0x2c4566),
        gum: M(0xd9707e), gumD: M(0xb04f5f), tooth: M(0xf4f1e6), key: M(0xc9a227),
        basket: M(0x9b6a3a), basketD: M(0x6e4823), yarn: M(0xc04a6a), yarn2: M(0x5b8fc4), needle: M(0xc8ccd2),
        wet: M(0x9fd4ff, { transparent: true, opacity: 0.35 }), frame: M(0xe6e0d2), glass: M(0x1a2430),
        pot: M(0xb85c34), potD: M(0x8a3f20), leaf: M(0x4f8a3a), bloom: M(0xe0507a),
        rug: M(0x8e2b2b), rugD: M(0x5e1a1a), rugGold: M(0xd2a64a),
      };
      const signMat = new THREE.MeshBasicMaterial({ transparent: true, map: canvasTex(96, 128, (g) => {
        g.fillStyle = "#ffd60a"; g.beginPath(); g.moveTo(10, 126); g.lineTo(26, 4); g.lineTo(70, 4); g.lineTo(86, 126); g.closePath(); g.fill();
        g.fillStyle = "#1d1d1f"; g.textAlign = "center"; g.font = "bold 13px Geist, sans-serif";
        g.fillText(T("DİKKAT"), 48, 26, 44); g.font = "bold 10px Geist, sans-serif"; g.fillText(T("KAYGAN"), 48, 98, 62); g.fillText(T("ZEMİN"), 48, 112, 66);
        g.lineWidth = 4; g.strokeStyle = "#1d1d1f"; g.lineCap = "round"; // slipping stick figure
        g.beginPath(); g.arc(40, 40, 6, 0, Math.PI * 2); g.fill();
        g.beginPath(); g.moveTo(42, 47); g.lineTo(50, 66); g.lineTo(64, 72); g.moveTo(50, 66); g.lineTo(34, 80); g.moveTo(45, 54); g.lineTo(30, 50); g.moveTo(45, 54); g.lineTo(60, 48); g.stroke();
        g.fillRect(24, 84, 48, 3);
      }, true) });
      function chairMesh() { // faces +x (rolls forward toward +x)
        const g = new THREE.Group();
        g.add(box(0.08, 0.7, HM.rim, -0.3, 0.6, 0)); g.add(box(0.2, 0.06, HM.tyre, -0.36, 0.95, 0.01)); // push handle
        g.add(box(0.12, 0.45, HM.seatD, -0.24, 0.62, 0.01)); g.add(box(0.55, 0.1, HM.seat, 0, 0.42, 0.02)); // backrest, seat
        g.add(box(0.06, 0.32, HM.rim, 0.24, 0.26, 0.01)); g.add(box(0.16, 0.04, HM.rim, 0.3, 0.1, 0.01)); // footrest
        const wheel = new THREE.Group(); wheel.position.set(-0.08, 0.3, 0.03);
        wheel.add(circle(0.3, HM.tyre)); wheel.add(circle(0.24, HM.rim, 0, 0, 0.01)); wheel.add(circle(0.2, HM.tyre, 0, 0, 0.015));
        [0, 1, 2].forEach((k) => { const sp = box(0.4, 0.025, HM.rim, 0, 0, 0.02); sp.rotation.z = (k * Math.PI) / 3; wheel.add(sp); });
        wheel.add(circle(0.04, HM.rim, 0, 0, 0.03)); g.add(wheel); g.add(circle(0.07, HM.tyre, 0.3, 0.07, 0.03));
        g.userData.wheel = wheel; return g;
      }
      function teethMesh() { // origin at the bottom; upper jaw pivots at the back
        const g = new THREE.Group(), half = (y0, sgn, mat) => { const m = new THREE.Mesh(geoOf("h|" + (sgn > 0), () => { const s = new THREE.Shape(); s.absellipse(0, 0, 0.24, 0.13, sgn > 0 ? 0 : Math.PI, sgn > 0 ? Math.PI : Math.PI * 2, false); return new THREE.ShapeGeometry(s); }), mat); m.position.y = y0; return m; };
        g.add(half(0.14, -1, HM.gum));
        for (let k = 0; k < 5; k++) g.add(box(0.07, 0.07, HM.tooth, -0.16 + k * 0.08, 0.17, 0.01));
        const up = new THREE.Group(); up.position.set(-0.2, 0.2, 0.02);
        const uh = half(0, 1, HM.gum); uh.position.x = 0.2; up.add(uh);
        for (let k = 0; k < 5; k++) up.add(box(0.07, 0.07, HM.tooth, 0.04 + k * 0.08, -0.02, 0.01));
        g.add(up); g.add(box(0.05, 0.04, HM.key, -0.27, 0.14, 0.03)); g.add(box(0.03, 0.14, HM.key, -0.31, 0.14, 0.03));
        g.add(box(0.05, 0.05, HM.tyre, -0.1, 0.02, 0.01)); g.add(box(0.05, 0.05, HM.tyre, 0.1, 0.02, 0.01)); // little feet
        g.userData.up = up; return g;
      }
      function needleMesh() { const m = new THREE.Group(); m.add(box(0.75, 0.04, HM.needle)); m.add(tri([0.37, 0.03, 0.47, 0, 0.37, -0.03], HM.needle, 0.01)); m.add(circle(0.05, HM.yarn, -0.38, 0, 0.01)); return m; }

      /* ===== Hastane traps: electric floor, stretcher, IV pole, automatic door ===== */
      let plates = [], gurneys = [], ivs = [], adoors = [], elecT = 0, elecOn = false, humT = 0;
      const HP = {
        plate: M(0x3a4048), plateD: M(0x23272c), glow: M(0x5ab8ff, { transparent: true, opacity: 0 }), spark: M(0xaee0ff),
        frame: M(0x9aa0a6), sheet: M(0xe8eef0), pillow: M(0xcfdde4),
        pole: M(0xc8ccd2), bag: M(0xbfe6ff, { transparent: true, opacity: 0.8 }), tube: M(0xdfeef2),
        door: M(0x8fb4c4, { transparent: true, opacity: 0.55 }), doorF: M(0x5e6a70),
      };
      function gurneyMesh() { // origin at the bottom middle; mattress top at 0.75
        const g = new THREE.Group(), wheels = [];
        [-0.6, 0.6].forEach((dx) => {
          g.add(box(0.05, 0.5, HP.frame, dx, 0.37, 0));
          const w = new THREE.Group(); w.position.set(dx, 0.09, 0.02); w.add(circle(0.09, HM.tyre)); w.add(box(0.12, 0.025, HP.frame, 0, 0, 0.01)); g.add(w); wheels.push(w);
        });
        g.add(box(1.6, 0.06, HP.frame, 0, 0.62, 0.01)); g.add(box(1.6, 0.12, HP.sheet, 0, 0.69, 0.02));
        g.add(box(0.35, 0.08, HP.pillow, -0.58, 0.77, 0.03)); g.add(box(0.05, 0.3, HP.frame, 0.82, 0.75, 0.01));
        g.userData.wheels = wheels; return g;
      }
      function ivMesh() { // pivots at its base; 2 tiles tall
        const g = new THREE.Group();
        g.add(box(0.5, 0.05, HP.frame, 0, 0.05, 0)); [-0.22, 0.22].forEach((dx) => g.add(circle(0.05, HM.tyre, dx, 0.05, 0.01)));
        g.add(box(0.05, 1.95, HP.pole, 0, 1, 0.01)); g.add(box(0.36, 0.04, HP.pole, 0, 1.95, 0.01));
        g.add(box(0.22, 0.32, HP.bag, 0.13, 1.74, 0.02)); g.add(box(0.015, 0.9, HP.tube, 0.13, 1.13, 0.02));
        return g;
      }
      /* Hastane traps 2: syringe rack, pill bottle, beeping lift, food cart */
      let syringes = [], bottles = [], pills = [], carts = [];
      let defibs = []; // â
      const sarjTex = canvasTex(128, 48, (g) => {
        g.fillStyle = "#06140c"; g.fillRect(0, 0, 128, 48); g.fillStyle = "#5dff9a"; g.font = "bold 30px Geist, sans-serif";
        g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(T("ŞARJ"), 64, 26, 116);
      }, true);
      Object.assign(HP, { pill: M(0xf2f2ee), pill2: M(0xe0574a), bottle: M(0xd98a2b, { transparent: true, opacity: 0.85 }), lid: M(0xf4f4f0), label: M(0xf6f1e4), tray: M(0x7f8a8e), food: M(0xc9a15a) });
      function syringeMesh() { // origin at the top (plunger); needle tip 0.65 below
        const g = new THREE.Group();
        g.add(box(0.16, 0.04, HP.pole, 0, -0.02, 0)); g.add(box(0.04, 0.12, HP.pole, 0, -0.09, 0));
        g.add(box(0.14, 0.34, HP.bag, 0, -0.32, 0.01)); g.add(box(0.1, 0.03, HP.pole, 0, -0.18, 0.02));
        g.add(tri([-0.02, -0.49, 0.02, -0.49, 0, -0.65], HM.needle, 0.02)); return g;
      }
      function bottleMesh() { // origin at the bottom middle; 1.1 tall; lid kept separate
        const g = new THREE.Group();
        g.add(box(0.8, 0.95, HP.bottle, 0, 0.475, 0)); g.add(box(0.82, 0.38, HP.label, 0, 0.45, 0.01));
        g.add(box(0.34, 0.06, HP.pill2, 0, 0.45, 0.02)); g.add(box(0.5, 0.1, HP.bottle, 0, 1.0, 0));
        const lid = box(0.62, 0.16, HP.lid, 0, 1.12, 0.02); g.add(lid); g.userData.lid = lid; return g;
      }
      function cartMesh() { // origin at the bottom middle; top tray at 0.85
        const g = new THREE.Group(), wheels = [];
        [-0.38, 0.38].forEach((dx) => { g.add(box(0.05, 0.75, HP.frame, dx, 0.47, 0)); const w = circle(0.09, HM.tyre, dx, 0.09, 0.02); g.add(w); wheels.push(w); });
        [0.35, 0.85].forEach((ty) => { g.add(box(0.9, 0.06, HP.tray, 0, ty, 0.01)); g.add(box(0.25, 0.08, HP.food, -0.2, ty + 0.07, 0.015)); g.add(circle(0.07, HP.sheet, 0.2, ty + 0.08, 0.015)); });
        g.add(box(0.05, 0.25, HP.frame, -0.45, 0.98, 0)); g.userData.wheels = wheels; return g;
      }

      /* ===== Kasap/Mezbaha traps: meat hook, cleaver thrower, grinder pit, hanging carcass ===== */
      let meatHooks = [], cleaverBlocks = [], cleavers = [], grinders = [], carcasses = [];
      let freezers = [], sausages = [], belts = [], slideDirs = {}, beltDirs = {};
      let meatballs = []; // î
      const KS = {
        steel: M(0xc8ccd2), steelD: M(0x7d8287), block: M(0x8a5a32), blockD: M(0x5e3b1e), handle: M(0x2b1d14),
        meat: M(0xf2a0aa), meatD: M(0xd97f8c), fat: M(0xfbe0e2),
        hopper: M(0x6a6e73),
        frost: M(0xe4eef4), frostD: M(0x9fb4c2), ketchup: M(0xd7261b), ketchupL: M(0xff6a55), cap: M(0xf4f1ea),
        sausage: M(0xa8452e), sausageD: M(0x7a2c1c), twine: M(0xd8c79a), belt: M(0x2b2d31), beltL: M(0x5a5f66),
      };
      // the direction a slick or belt run carries her: toward the nearest hazard ahead (right), else behind, else right
      const HAZ = "YzZeJcdoqkTXDLEWtIQnsCUHgfbVaNxly234567890%@;:<,>{?]}'çşğöüÇŞĞÖÜı()*/-.`\"âîûê";
      const isHaz = (c, cy) => c >= 0 && c < W - 1 && (HAZ.includes(tile(c, cy)) || !isGroundChar(tile(c, cy - 1)));
      function hazDir(l, r, cy) {
        for (let k = 1; k <= 6; k++) if (isHaz(r + k, cy)) return 1;
        for (let k = 1; k <= 6; k++) if (isHaz(l - k, cy)) return -1;
        return 1;
      }
      function sausageMesh(L) { // origin at the pivot; four sausages on a twine, the lowest L below
        const g = new THREE.Group();
        g.add(box(0.04, L, KS.twine, 0, -L / 2, -0.01));
        [0.75, 1.11, 1.47, 1.83].forEach((d) => {
          const s = circle(0.17, KS.sausage, 0, -d, 0); s.scale.set(0.7, 1.12, 1); g.add(s);
          g.add(circle(0.04, KS.sausageD, 0.04, -d + 0.06, 0.01)); g.add(box(0.12, 0.03, KS.twine, 0, -d + 0.18, 0.01));
        });
        return g;
      }
      function ketchupBottle(dir) { // tipped-over squeeze bottle, nozzle pointing along the slide
        const g = new THREE.Group();
        g.add(box(0.62, 0.3, KS.ketchup, 0, 0.15, 0)); g.add(box(0.3, 0.16, KS.cap, -0.02, 0.15, 0.01));
        g.add(box(0.12, 0.22, KS.cap, 0.36, 0.15, 0)); g.add(tri([0.42, 0.21, 0.42, 0.09, 0.56, 0.15], KS.cap, 0));
        g.add(circle(0.1, KS.ketchup, 0.66, 0.06, 0.01));
        g.scale.x = dir; return g;
      }
      function hookMesh() { // origin at the hook's middle; chain runs up 3 tiles to the trolley
        const g = new THREE.Group();
        g.add(box(0.06, 2.3, chainMat, 0, 1.4, -0.01));
        g.add(box(0.08, 0.5, KS.steel, 0.1, 0.05, 0)); g.add(box(0.3, 0.08, KS.steel, -0.01, -0.17, 0)); g.add(box(0.08, 0.2, KS.steel, -0.12, -0.08, 0));
        g.add(tri([-0.16, 0.02, -0.08, 0.02, -0.12, 0.12], KS.steel, 0.01)); g.add(circle(0.07, KS.steelD, 0.1, 0.3, 0.01));
        const tr = new THREE.Group(); tr.position.y = 2.55; tr.add(box(0.36, 0.14, KS.steelD)); tr.add(circle(0.07, HM.tyre, -0.1, 0.08, 0.01)); tr.add(circle(0.07, HM.tyre, 0.1, 0.08, 0.01)); g.add(tr);
        return g;
      }
      function cleaverMesh() { // spinning projectile, origin at its middle
        const g = new THREE.Group();
        g.add(box(0.3, 0.22, KS.steel, 0.06, 0.02, 0)); g.add(box(0.3, 0.04, KS.steelD, 0.06, -0.08, 0.01)); g.add(circle(0.03, KS.steelD, 0.14, 0.08, 0.01));
        g.add(box(0.2, 0.07, KS.handle, -0.18, 0.06, 0)); return g;
      }
      function carcassMesh(L) { // origin at the pivot; a pink cartoon side of meat hangs L below
        const g = new THREE.Group();
        g.add(box(0.06, L - 0.5, chainMat, 0, -(L - 0.5) / 2, -0.01));
        g.add(box(0.07, 0.25, KS.steel, 0, -L + 0.62, 0));
        const body = circle(0.55, KS.meat, 0, -L, 0); body.scale.x = 0.6; g.add(body);
        const sh = circle(0.42, KS.meatD, 0.06, -L - 0.08, 0.005); sh.scale.x = 0.45; g.add(sh);
        [-0.25, 0, 0.25].forEach((dy) => g.add(box(0.5, 0.06, KS.fat, 0, -L + dy, 0.01)));
        g.add(circle(0.07, KS.fat, 0, -L - 0.52, 0.01));
        return g;
      }

      /* ===== Lunapark traps: bumper car, jack-in-the-box, ferris wheel, balloons ===== */
      let bumpers = [], jacks = [], wheels = [], cabins = [], balloons = [];
      const LP = {
        car: [M(0xd8343a), M(0x2f6fd0), M(0xe0a92a), M(0x2fa86a)], rubber: M(0x1c1c20), seat: M(0x2a2a30), chrome: M(0xc9ccd2), lamp: M(0xfff1b0),
        pad: M(0xe8d24a), padD: M(0x9a8420),
        box: M(0x7a3fb0), boxD: M(0x4e2672), star: M(0xf2d24a), spring: M(0xb9bec6), face: M(0xf6f1ea), nose: M(0xe02a2a), hair: M(0xff8a1e), ink: M(0x141414),
        rim: M(0xd9c7e8), spoke: M(0xa48cb8), hub: M(0x5a3f6e), bulb: [M(0xff5a6a), M(0xffd84a), M(0x6ad8ff), M(0x9aff7a)], cab: [M(0x3fa8d8), M(0xe85aa0), M(0xf0c040), M(0x58c878)],
        balloon: [M(0xe8323c), M(0x3a8ae8), M(0xf2c53a)], shine: M(0xffffff, { transparent: true, opacity: 0.55 }), string: M(0xdedad0),
      };
      const honk = () => { tone("square", 392, 370, 0.16, 0.07); tone("square", 494, 466, 0.16, 0.05); tone("square", 392, 370, 0.12, 0.06, 0.2); tone("square", 494, 466, 0.12, 0.04, 0.2); };
      function bumperMesh(mat) { // origin at the bottom middle, facing +x; 0.7 tall, 0.9 wide
        const g = new THREE.Group();
        g.add(box(1.0, 0.18, LP.rubber, 0, 0.12, 0)); g.add(box(0.9, 0.4, mat, 0, 0.4, 0.01));
        g.add(tri([0.45, 0.2, 0.45, 0.6, 0.62, 0.42, 0.62, 0.22], mat, 0.01)); g.add(circle(0.06, LP.lamp, 0.55, 0.42, 0.02));
        g.add(box(0.32, 0.28, LP.seat, -0.22, 0.68, 0)); g.add(box(0.05, 0.25, LP.chrome, 0.18, 0.66, 0.02)); g.add(box(0.18, 0.04, LP.chrome, 0.18, 0.78, 0.02));
        g.add(box(0.04, 1.9, LP.chrome, -0.32, 1.5, -0.02)); g.add(circle(0.05, LP.lamp, -0.32, 2.45, -0.01)); // pole up to the ceiling grid
        return g;
      }
      function jackMesh() { // origin at the bottom middle of the box; the clown sits on a spring in g.userData.jack
        const g = new THREE.Group();
        g.add(box(0.62, 0.6, LP.boxD, 0, 0.3, 0)); g.add(box(0.54, 0.52, LP.box, 0, 0.3, 0.01));
        g.add(circle(0.11, LP.star, 0, 0.3, 0.02));
        const crank = new THREE.Group(); crank.position.set(0.34, 0.32, 0.02); crank.add(box(0.06, 0.06, LP.chrome)); crank.add(box(0.04, 0.2, LP.chrome, 0, 0.08, 0)); crank.add(circle(0.04, LP.nose, 0, 0.18, 0.01)); g.add(crank);
        const lid = new THREE.Group(); lid.position.set(-0.31, 0.6, 0.02); lid.add(box(0.64, 0.06, LP.boxD, 0.32, 0.02, 0)); g.add(lid);
        const jack = new THREE.Group(); jack.position.set(0, 0.6, 0.015);
        const spring = new THREE.Group();
        for (let k = 0; k < 8; k++) { const s = box(0.3, 0.035, LP.spring, 0, 0.08 + k * 0.15, 0); s.rotation.z = k % 2 ? 0.35 : -0.35; spring.add(s); }
        jack.add(spring);
        const head = new THREE.Group();
        [[-0.26, 0.04], [0.26, 0.04], [0, 0.26]].forEach(([dx, dy]) => head.add(circle(0.14, LP.hair, dx, dy, -0.01)));
        head.add(circle(0.26, LP.face)); head.add(circle(0.06, LP.nose, 0, -0.01, 0.01));
        [-0.1, 0.1].forEach((dx) => head.add(circle(0.035, LP.ink, dx, 0.08, 0.01)));
        head.add(ring(0.1, 0.13, LP.nose, 0, -0.04, 0.01, Math.PI * 1.1, Math.PI * 0.8));
        jack.add(head); g.add(jack);
        jack.visible = false; g.userData = { jack, spring, head, lid, crank }; return g;
      }
      function cabinMesh(mat) { // origin at the floor's top; hangs 0.5 below its rim pin
        const g = new THREE.Group();
        g.add(box(0.9, 0.14, mat, 0, -0.07, 0)); g.add(box(0.9, 0.3, mat, 0, 0.1, -0.02));
        g.add(box(0.94, 0.04, LP.chrome, 0, -0.14, 0.01));
        [-0.4, 0.4].forEach((dx) => { const b = box(0.035, 0.6, LP.chrome, dx * 0.55, 0.26, -0.03); b.rotation.z = dx > 0 ? 0.35 : -0.35; g.add(b); });
        g.add(circle(0.06, LP.hub, 0, 0.5, -0.02)); return g;
      }
      function balloonMesh(mat) { // origin at the floor; the balloon sits on its knot
        const g = new THREE.Group();
        const b = circle(0.3, mat, 0, 0.42, 0); b.scale.y = 1.15; g.add(b);
        const sh = circle(0.07, LP.shine, -0.1, 0.55, 0.01); sh.scale.y = 1.6; g.add(sh);
        g.add(tri([-0.05, 0.05, 0.05, 0.05, 0, 0.1], mat, 0)); g.add(box(0.02, 0.08, LP.string, 0, 0.03, -0.01));
        return g;
      }
      /* ===== More Lunapark traps: coaster cart, cotton-candy cloud, mirror maze, shooting gallery ===== */
      let coasters = [], candies = [], mirrorPanes = [], targets = [], darts = [];
      const LP2 = {
        rail: M(0x8a8f96), tie: M(0x5a3a22), cart: M(0xd8343a), cartD: M(0x8e1e22), lever: M(0xf2d24a),
        candy: M(0xff9fd0, { transparent: true, opacity: 0.85 }), candyL: M(0xffd0ea, { transparent: true, opacity: 0.85 }), stick: M(0xf4efe6),
        frame: M(0xc9ccd2, { transparent: true, opacity: 0.35 }),
        board: M(0x8a5a32), white: M(0xf6f1ea), red: M(0xd8343a), dart: M(0x2a2a30), flet: M(0x3fa8d8),
      };
      function coasterMesh() { // origin at the rail top, facing -x (it rushes in from the right)
        const g = new THREE.Group();
        g.add(box(1.2, 0.42, LP2.cart, 0, 0.36, 0)); g.add(box(1.2, 0.08, LP2.cartD, 0, 0.18, 0.01));
        g.add(tri([-0.6, 0.15, -0.6, 0.57, -0.82, 0.2], LP2.cart, 0)); g.add(circle(0.06, LP.lamp, -0.66, 0.3, 0.02));
        g.add(box(0.12, 0.3, LP.seat, 0.45, 0.7, -0.01)); g.add(box(0.5, 0.05, LP.chrome, -0.1, 0.62, 0.02));
        [-0.38, 0.38].forEach((dx) => g.add(circle(0.11, LP.rubber, dx, 0.1, 0.02)));
        [-0.3, 0, 0.3].forEach((dx) => g.add(circle(0.05, LP.star, dx, 0.38, 0.02)));
        return g;
      }
      function candyMesh(c) { // a pink cloud of spun sugar sitting on the floor tile
        const g = new THREE.Group();
        [[-0.32, 0.28, 0.26], [0, 0.42, 0.34], [0.3, 0.3, 0.27], [-0.12, 0.66, 0.24], [0.2, 0.62, 0.22]].forEach(([dx, dy, r], k) => g.add(circle(r, (k + c) % 2 ? LP2.candyL : LP2.candy, dx, dy, k * 0.002)));
        return g;
      }
      function targetMesh() { // shooting-gallery booth: striped backboard with a bullseye; origin at the floor
        const g = new THREE.Group();
        g.add(box(0.95, 1.9, LP2.board, 0, 0.95, -0.3));
        for (let k = 0; k < 4; k++) g.add(box(0.95, 0.12, k % 2 ? LP2.white : LP2.red, 0, 1.75 - k * 0.12, -0.29));
        [[0.42, LP2.white], [0.32, LP2.red], [0.22, LP2.white], [0.11, LP2.red]].forEach(([r, m], k) => g.add(circle(r, m, 0, 0.5, -0.28 + k * 0.002)));
        [0.8, 0.5, 0.12].forEach((h) => g.add(box(0.08, 0.08, LP.ink, -0.45, h, -0.2)));
        return g;
      }
      function dartMesh() { // flies toward -x; origin at its middle
        const g = new THREE.Group();
        g.add(box(0.4, 0.035, LP2.dart)); g.add(tri([-0.2, 0.03, -0.2, -0.03, -0.3, 0], LP.chrome, 0));
        g.add(tri([0.12, 0, 0.22, 0.08, 0.22, 0], LP2.flet, 0.01)); g.add(tri([0.12, 0, 0.22, -0.08, 0.22, 0], LP2.flet, 0.01));
        return g;
      }
      const bell = () => [0, 0.13, 0.26].forEach((d) => { tone("triangle", 1568, 1550, 0.11, 0.12, d); tone("sine", 2350, 2330, 0.08, 0.05, d); });
      function bonkMirror(cx, cy, dir) { // walked into the "open gap": thud, shake, bounce back
        if (p.bonkT > 0) return;
        p.bonkT = 0.4; p.fling = 0.3; p.flingV = -dir * 5; p.vy = Math.max(p.vy, 4); p.onGround = false; p.coyote = 0; p.jumping = false;
        tone("sine", 190, 80, 0.18, 0.22); SFX.squeak(); shakeT = Math.max(shakeT, 0.15); buzz(40); dust(p.x + dir * HW, p.y, 4, -dir);
        for (const m of mirrorPanes) if (m.c === cx && Math.abs(m.cy - cy) <= 1) m.flash = 0.5;
      }
      /* ===== Kanalizasyon traps: rat pack, manhole steam jet ===== */
      let ratPacks = [], manholes = [], crocs = [], sewers = [], pipes = [], drops = [];
      const KN = {
        rat: M(0x6b625a), ratD: M(0x4a433d), pink: M(0xe8a0a8), eye: M(0x111111),
        iron: M(0x3a3c3f), ironL: M(0x5c6064), rim: M(0x26282a),
        croc: M(0x3f8a3a), crocD: M(0x2c6229), crocL: M(0xb8d48a), white: M(0xfafaf2),
        tox: M(0x8fe03a), bub: M(0xcfe8d8, { transparent: true, opacity: 0.7 }),
      };
      function crocMesh() { // origin at the water line under the eyes; two jaws pointing up, closed
        const g = new THREE.Group(), jaws = [];
        [-1, 1].forEach((s) => {
          const j = new THREE.Group();
          j.add(box(0.34, 1.4, KN.croc, s * 0.17, -0.6, 0)); j.add(box(0.08, 1.3, KN.crocL, s * 0.04, -0.65, 0.01));
          for (let k = 0; k < 4; k++) { const ty = 0.05 - k * 0.22; j.add(tri([0, ty, 0, ty - 0.14, -s * 0.09, ty - 0.07], KN.white, 0.02)); }
          j.add(circle(0.11, KN.croc, s * 0.17, 0.08, 0.015)); j.add(circle(0.08, KN.white, s * 0.17, 0.1, 0.02));
          j.add(circle(0.035, KN.eye, s * 0.15, 0.1, 0.025)); j.add(box(0.2, 0.04, KN.crocD, s * 0.17, 0.19, 0.03));
          g.add(j); jaws.push(j);
        });
        g.userData.jaws = jaws; return g;
      }
      function pipeMesh() { // origin at the ceiling (top of the cell), hangs 0.5 down
        const g = new THREE.Group();
        g.add(box(0.5, 0.1, KN.ironL, 0, -0.05, 0)); g.add(box(0.2, 0.45, KN.iron, 0, -0.3, 0));
        g.add(box(0.3, 0.08, KN.ironL, 0, -0.5, 0.01)); g.add(box(0.06, 0.3, KN.tox, 0.05, -0.32, 0.01));
        const drip = circle(0.07, KN.tox, 0, -0.56, 0.02); g.add(drip); g.userData.drip = drip; return g;
      }
      function ratMesh() { // origin at the floor, facing +x
        const g = new THREE.Group();
        const tail = box(0.26, 0.025, KN.pink, -0.3, 0.08, -0.01); tail.rotation.z = 0.35; g.add(tail);
        const b = circle(0.12, KN.rat, 0, 0.12, 0); b.scale.x = 1.5; g.add(b);
        g.add(tri([0.12, 0.2, 0.12, 0.04, 0.31, 0.08], KN.rat, 0.01));
        g.add(circle(0.025, KN.pink, 0.31, 0.08, 0.02)); g.add(circle(0.05, KN.pink, 0.11, 0.22, 0.015));
        g.add(circle(0.018, KN.eye, 0.2, 0.13, 0.02));
        const legs = [box(0.04, 0.06, KN.ratD, -0.1, 0.03, 0.01), box(0.04, 0.06, KN.ratD, 0.1, 0.03, 0.01)];
        legs.forEach((l) => g.add(l)); g.userData.legs = legs; return g;
      }
      function manholeLid() { // origin at the lid's bottom middle
        const g = new THREE.Group();
        g.add(box(0.8, 0.08, KN.iron, 0, 0.04, 0));
        [-0.24, -0.08, 0.08, 0.24].forEach((dx) => g.add(box(0.06, 0.03, KN.ironL, dx, 0.09, 0.01)));
        return g;
      }

      /* ===== Fabrika traps: hydraulic press, welding robot, gear platform ===== */
      let presses = [], welders = [], gears = [], lasers = [], cranes = [];
      const FB = {
        char: M(0x1b1714), crate: M(0x9a6a32), crateD: M(0x6a4520),
        steel: M(0xb8bcc2), steelD: M(0x4a4e54), black: M(0x141414), press: M(0x8a8f96), robot: M(0xe07a1a),
        spark: M(0xfff3b0), glow: M(0xffa020, { transparent: true, opacity: 0.7 }), gear: M(0x8a6a3a), gearD: M(0x5e4626), scorch: M(0x1a120a),
      };
      let fanBlades = [], ratKings = [], sparkers = [], ramps = []; // ( ) Kanal, * / Fabrika
      const XT = {
        vent: M(0x2c3a2a), ventD: M(0x0e140e), iron: M(0x4a4e54), blade: M(0xb8bcc2), gold: M(0xe8b830),
        ramp: M(0x6a6e74), rampL: M(0x9aa0a6), barrel: M(0x8a4b2a), barrelD: M(0x5e3018), band: M(0x2e2f33),
      };

      /* ===== Buzhane traps: icicle, ice floor, rolling snowball ===== */
      let icicles = [], snowballs = [];
      const ICE_FRIC = 0.1 * 40; // normal ground friction ~40 tiles/s², ice keeps 10% of it
      const BZ = {
        ice: M(0xbfe6ff), iceD: M(0x7fb8dc), iceL: M(0xf2fbff),
        floor: M(0xcfefff, { transparent: true, opacity: 0.55 }), shine: M(0xffffff, { transparent: true, opacity: 0.6 }),
        snow: M(0xf4f8fc), snowD: M(0xc9d8e6),
        frame: M(0x5d7a8f), frameD: M(0x34495a), blade: M(0xa9c4d6), crack: M(0x1f4a66),
      };
      let fans = [], icePresses = [], windPush = 0; // windPush: tiles/s the fan adds to her speed this frame

      /* ===== Metro Tüneli traps: train, third rail, closing car doors ===== */
      let trains = [], thirdRails = [], mdoors = [], railHum = 0, escalators = [], turnstiles = [], cables = [];
      const MT = {
        body: M(0xb9bdc2), bodyD: M(0x7d8288), stripe: M(0xc4302b), win: M(0x1a2228), winL: M(0xffe39a), nose: M(0x2a2c30),
        light: M(0xfff2b0), rail: M(0x8a8e94), railL: M(0xc8ccd2), sleeper: M(0x3a2a1c),
        third: M(0xd8b02a), thirdD: M(0x5a4a1a), ins: M(0xe8e8e2), spark: M(0xaee0ff), door: M(0xa8adb3), doorW: M(0x2a3640),
      };

      /* ===== Kukla'nın Stüdyosu traps: falling spotlight, marionette hands, fake-applause trapdoor ===== */
      let spots = [], puppetHands = [], tdoors = [], stageOpen = {};
      let camCranes = [], cannons = [], cshots = [], fdoors = [], turns = []; // ç ş ğ ö (turns share stageOpen)
      let curtains = []; // û
      const CF = {
        barrel: M(0xd8337a), barrelL: M(0xffd23f), shot: M(0x3a7bd5), door: M(0x8a8f96), doorD: M(0x5d6268),
        glove: M(0xd42a2a), gloveD: M(0x8e1414), velvet: M(0x8a1a26), gold: M(0xc9a227),
      };
      const CONF = [0xff4d6d, 0xffd23f, 0x3ad17a, 0x3a9bff, 0xb05cff].map((h) => M(h));
      const cikisTex = canvasTex(256, 96, (g) => {
        g.fillStyle = "#0b7a3b"; g.fillRect(0, 0, 256, 96); g.strokeStyle = "#e8fff0"; g.lineWidth = 5; g.strokeRect(5, 5, 246, 86);
        g.fillStyle = "#f4fff6"; g.font = "bold 44px Geist, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(T("ÇIKIŞ →"), 128, 50, 226);
      }, true);
      const ST = {
        truss: M(0x2a2a2e), trussL: M(0x5a5d63), chain: M(0x6a6e74), lamp: M(0x1c1c20), lampL: M(0x44444a),
        glass: M(0xfff2b0, { transparent: true, opacity: 0.9 }), string: M(0xd8d0b8), cuff: M(0x7a1a24),
        plank: M(0x6a4024), plankD: M(0x3e2414), edge: M(0x8a1a26),
      };
      const alkisTex = canvasTex(256, 80, (g) => {
        g.fillStyle = "#2a0a0e"; g.fillRect(0, 0, 256, 80); g.strokeStyle = "#c9a227"; g.lineWidth = 6; g.strokeRect(3, 3, 250, 74);
        g.fillStyle = "#ffe08a"; for (let x = 14; x < 250; x += 19) { g.beginPath(); g.arc(x, 11, 3.5, 0, 7); g.arc(x, 69, 3.5, 0, 7); g.fill(); }
        g.fillStyle = "#fff4d6"; g.font = "bold 40px Geist, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(T("ALKIŞ"), 128, 42, 220);
      }, true);

      /* ===== Bodrum traps: steam boiler, toppling shelf, giant mousetrap, swinging bulb ===== */
      let boilers = [], shelves = [], mtraps = [], swingBulbs = []; // ü Ç Ş Ğ
      let spiders = [], washers = [], socks = [], stairSteps = [], flipBoards = []; // Ö Ü İ ı
      let pjars = []; // ê
      const BD = {
        spider: M(0x2a2230), spiderL: M(0x4a3a56), eye: M(0xffffff), pupil: M(0x111111), web: M(0xd8d8e0),
        washer: M(0xeef0f2), washerD: M(0xa9afb6), drum: M(0x3a4a5a), water: M(0x5fa8e0, { transparent: true, opacity: 0.7 }),
        sock: M(0xc84848), sockL: M(0xf2ece0), drip: M(0x8ec8f0),
        tank: M(0x8a4b2a), tankD: M(0x5e3018), band: M(0x3a2c24), iron: M(0x2e2f33), brass: M(0xb8913a), gauge: M(0xe8e2d0),
        puff: M(0xf2f4f6, { transparent: true, opacity: 0.6 }), shelf: M(0x6a4528), shelfD: M(0x3a2414),
        steel: M(0xc8ccd2), cheese: M(0xf2c53d), cheeseD: M(0xc9982a),
      };
      const JARS = [M(0x6e8f3a), M(0xa8263a), M(0xd88a2a)];

      /* ===== Extra traps: ceiling fan (-), belly-sliding penguin (.), falling station sign (`), tin duck gallery (") ===== */
      let droppers = [], penguins = [], duckRails = []; // droppers: fans and signs that fall when she is directly below
      const XR = {
        fan: M(0x8a6a42), fanD: M(0x4e3a22), hub: M(0xd8d0bc), hubD: M(0x6a6e74),
        peng: M(0x1c2230), belly: M(0xf6f6f2), beak: M(0xf0a020), eye: M(0xffffff), pupil: M(0x111111),
        duck: M(0xf2c53d), duckD: M(0xc9982a), stripeA: M(0xd42a2a), stripeB: M(0xf6f0e0), rail: M(0x6a6e74),
      };
      const peronTex = canvasTex(256, 96, (g) => {
        g.fillStyle = "#1d3f8a"; g.fillRect(0, 0, 256, 96); g.strokeStyle = "#f4f6fa"; g.lineWidth = 5; g.strokeRect(5, 5, 246, 86);
        g.fillStyle = "#f4f6fa"; g.font = "bold 40px Geist, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("PERON 2 →", 128, 50);
      });

      /* ===== Boss fight (BOSS_LVLS): Kukla hangs over the arena (Б); glowing floor buttons (б) drop sandbags on it ===== */
      let boss = null, bossAt = null, bossBtns = [], droneG = null, droneHi = false, bossToastT = 0;
      const BK = {
        wood: M(0xa8703d), woodD: M(0x7d4c24), jaw: M(0x9a6435), fez: M(0xb5121b), ink: M(0x0d0907), eye: M(0xf4ecd8), iris: M(0x3a5a8a),
        shirt: M(0xf1ece2), stripe: M(0xc1121f), pants: M(0x2e2420), string: M(0xd8d2c4), post: M(0x55585e), postD: M(0x2a2c30),
        cap: M(0xd42a2a), capG: M(0x3ad17a), capOff: M(0x6a6e74), bag: M(0x9a7a4a), bagD: M(0x6a5030), steel: M(0xb8bec6),
        ice: M(0xbfe6f6), bomb: M(0x1c1c20), spark: M(0xffb030), pickle: M(0x4e6a26),
        glow: M(0x3ad17a, { transparent: true, opacity: 0.35, depthWrite: false }),
      };
      const TAUNTS = ["Ahh! İpim!", "Bunu ödeyeceksin nine!", "Takma dişlerin bende!"];
      const BOSS_KILL = ["squash", "squash", "spike", "saw", "boom", "squash", "saw", "spike", "squash", "squash"];
      function kuklaMesh() { // the TV's fez marionette, 3 tiles tall; origin at the feet; strings run 16 tiles up
        const g = new THREE.Group(), part = (px, py, pz) => { const q = new THREE.Group(); q.position.set(px, py, pz || 0); g.add(q); return q; };
        const legs = [-1, 1].map((s) => { const l = part(s * 0.2, 1); l.add(box(0.24, 0.92, BK.pants, 0, -0.46, 0)); l.add(box(0.36, 0.14, BK.ink, s * 0.06, -0.92, 0.01)); return l; });
        g.add(box(0.92, 0.95, BK.shirt, 0, 1.45, 0.02));
        for (let k = -2; k <= 2; k++) g.add(box(0.09, 0.95, BK.stripe, k * 0.18, 1.45, 0.03));
        const arms = [-1, 1].map((s) => { const a = part(s * 0.54, 1.85, 0.04); a.add(box(0.2, 0.8, BK.wood, 0, -0.4, 0)); a.add(circle(0.13, BK.woodD, 0, -0.84, 0.01)); return a; });
        g.add(box(0.2, 0.16, BK.woodD, 0, 1.98, 0.01));
        const head = part(0, 2.04, 0.05), face = circle(0.42, BK.wood, 0, 0.46, 0); face.scale.y = 1.08; head.add(face);
        [[-0.2, 0.62, 0.5], [0.22, 0.6, -0.4]].forEach(([x, y, r]) => head.add(rbox(0.03, 0.3, BK.woodD, x, y, 0.005, r))); // grain
        [-0.16, 0.16].forEach((x) => {
          head.add(circle(0.1, BK.eye, x, 0.52, 0.01)); head.add(circle(0.05, BK.iris, x + 0.01, 0.51, 0.02)); head.add(circle(0.022, BK.ink, x + 0.01, 0.51, 0.03));
          head.add(rbox(0.18, 0.04, BK.ink, x, 0.66, 0.02, x > 0 ? 0.25 : -0.25));
        });
        head.add(tri([-0.05, 0.46, 0.05, 0.46, 0, 0.34], BK.woodD, 0.02));
        const jaw = new THREE.Group(); jaw.position.set(0, 0.24, 0.01); head.add(jaw); // hinged jaw with its two slots
        jaw.add(box(0.56, 0.24, BK.jaw, 0, -0.12, 0)); [-0.27, 0.27].forEach((x) => jaw.add(box(0.03, 0.24, BK.ink, x, -0.12, 0.01)));
        [-1, 1].forEach((s) => head.add(rbox(0.26, 0.07, BK.ink, s * 0.14, 0.3, 0.04, -s * 0.25))); // painted mustache
        head.add(tri([-0.22, 0.84, 0.22, 0.84, 0.16, 1.16], BK.fez, 0.02)); head.add(tri([-0.22, 0.84, 0.16, 1.16, -0.16, 1.16], BK.fez, 0.02)); // fez
        head.add(box(0.03, 0.24, BK.ink, 0.18, 1.02, 0.03)); head.add(box(0.07, 0.1, BK.ink, 0.18, 0.88, 0.03)); // tassel
        // strings in snap order: left hand, right of head, right hand, left of head
        const strings = [[-0.83, 1.06], [0.3, 2.95], [0.83, 1.06], [-0.3, 2.95]].map(([x, y]) => { const s = box(0.03, 16, BK.string, x, y + 8, -0.02); s.userData.y0 = y; g.add(s); return s; });
        return { g, legs, arms, head, jaw, strings };
      }
      function bossHazMesh(z) { // origin at the bottom, about 0.7 tall
        const g = new THREE.Group(), add = (m, s, y, r) => { m.scale.setScalar(s); m.position.y = y; m.rotation.z = r || 0; g.add(m); return m; };
        if (z === 0) { g.add(box(0.5, 0.58, JARS[0], 0, 0.3, 0)); g.add(box(0.56, 0.12, BK.steel, 0, 0.64, 0.01)); [[-0.1, 0.26, 0.3], [0.1, 0.36, -0.2]].forEach(([x, y, r]) => g.add(rbox(0.12, 0.32, BK.pickle, x, y, 0.01, r))); }
        else if (z === 1) add(teethMesh(), 1.8, 0);
        else if (z === 2) add(syringeMesh(), 1.6, 1.05);
        else if (z === 3) add(cleaverMesh(), 1.8, 0.4, -Math.PI / 2);
        else if (z === 4) { g.add(circle(0.3, BK.bomb, 0, 0.3, 0)); g.add(circle(0.07, BK.steel, -0.1, 0.4, 0.01)); g.add(box(0.02, 0.4, BK.string, 0, 0.75, 0)); g.add(circle(0.24, BK.stripe, 0, 1.1, 0)); g.add(circle(0.06, BK.spark, 0.14, 0.62, 0.02)); }
        else if (z === 5) add(ratMesh(), 2, 0);
        else if (z === 6) { const q = new THREE.Group(); q.position.y = 0.38; q.add(circle(0.28, BK.steel)); for (let k = 0; k < 8; k++) { const t = box(0.12, 0.14, BK.steel, Math.cos(k * 0.785) * 0.32, Math.sin(k * 0.785) * 0.32, 0); t.rotation.z = k * 0.785; q.add(t); } q.add(circle(0.08, BK.postD, 0, 0, 0.01)); g.add(q); g.userData.spin = q; }
        else if (z === 7) { g.add(tri([-0.2, 1, 0.2, 1, 0, 0], BK.ice, 0)); g.add(tri([-0.06, 0.95, 0.02, 0.95, -0.03, 0.4], BK.eye, 0.01)); }
        else if (z === 8) { g.add(box(0.06, 0.7, BK.post, 0, 0.35, 0)); g.add(circle(0.28, BK.stripe, 0, 0.75, 0.01)); g.add(box(0.36, 0.08, BK.eye, 0, 0.75, 0.02)); }
        else { g.add(box(0.08, 0.2, BK.pants, -0.07, 0.1, 0)); g.add(box(0.08, 0.2, BK.pants, 0.07, 0.1, 0)); g.add(box(0.3, 0.3, BK.shirt, 0, 0.35, 0.01)); g.add(box(0.07, 0.3, BK.stripe, 0, 0.35, 0.02)); g.add(circle(0.15, BK.wood, 0, 0.64, 0.01)); g.add(box(0.15, 0.12, BK.fez, 0, 0.82, 0.02)); }
        return g;
      }
      function bossBtnMesh() { // red push button on a small post; a green glow behind the cap when it is live
        const g = new THREE.Group(), glow = circle(0.55, BK.glow, 0, 0.52, -0.02), cap = circle(0.17, BK.cap, 0, 0.52, 0);
        glow.visible = false; g.add(glow); g.add(cap);
        g.add(box(0.5, 0.08, BK.postD, 0, 0.04, 0.01)); g.add(box(0.14, 0.42, BK.post, 0, 0.25, 0.01)); g.add(box(0.42, 0.1, BK.postD, 0, 0.5, 0.02));
        const arrow = new THREE.Mesh(pg(1.1, 1.375), BTN_ARROW); arrow.position.set(0, 1.7, 0.3); arrow.visible = false; g.add(arrow);
        g.userData.glow = glow; g.userData.cap = cap; g.userData.arrow = arrow; return g;
      }
      // bouncing green "BAS!/STEP!" arrow shown above a glowing button
      const BTN_ARROW = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, fog: false, map: canvasTex(256, 320, (g) => {
        g.textAlign = "center"; g.textBaseline = "middle"; g.font = "bold 72px Geist, sans-serif"; g.lineJoin = "round";
        g.lineWidth = 12; g.strokeStyle = "#08130c"; g.strokeText(T("BAS!"), 128, 52); g.fillStyle = "#5dff9a"; g.fillText(T("BAS!"), 128, 52);
        g.beginPath(); g.moveTo(92, 110); g.lineTo(164, 110); g.lineTo(164, 200); g.lineTo(216, 200); g.lineTo(128, 300); g.lineTo(40, 200); g.lineTo(92, 200); g.closePath();
        g.lineWidth = 10; g.strokeStyle = "#08130c"; g.stroke(); g.fillStyle = "#3ad17a"; g.fill();
      }, true) });
      let hintT = 0, bossDied = false;
      function showHint(ms) {
        const el = document.getElementById("bossHint"); clearTimeout(hintT);
        el.textContent = T("Yeşil yanan düğmeye bas → kum torbası Kukla'nın ipini koparır! (4 ip)"); el.classList.add("is-on");
        hintT = setTimeout(() => el.classList.remove("is-on"), ms);
      }
      function hideHint() { clearTimeout(hintT); document.getElementById("bossHint").classList.remove("is-on"); }
      function bagMesh() { const g = new THREE.Group(), b = circle(0.34, BK.bag, 0, 0.3, 0); b.scale.y = 0.85; g.add(b); g.add(tri([-0.12, 0.62, 0.12, 0.62, 0, 0.5], BK.bagD, 0.01)); g.add(box(0.2, 0.04, BK.bagD, 0, 0.3, 0.01)); return g; }
      function cleaverMesh() { // butcher cleaver for the sweep boss: grey blade, brown handle, spun in updateBoss
        const g = new THREE.Group(), s = new THREE.Group(); g.add(s); g.userData.spin = s;
        s.add(box(0.8, 0.5, M(0x9aa0a6), 0.15, 0)); s.add(box(0.8, 0.06, M(0xd8dde2), 0.15, -0.22, 0.01)); s.add(box(0.5, 0.13, M(0x6b3d1e), -0.5, 0.12, 0.01));
        return g;
      }
      function waveMesh() { // sewage wave for the wave boss: a rounded brown-green box ~1.2 x 0.5, bobbed in updateBoss
        const g = new THREE.Group(), mt = M(0x5a6b2a); g.add(box(0.7, 0.5, mt)); g.add(circle(0.25, mt, -0.35, 0, 0)); g.add(circle(0.25, mt, 0.35, 0, 0)); g.userData.bob = true; return g;
      }
      function legSweepMesh() { const g = new THREE.Group(); g.add(box(2.4, 0.3, BK.pants)); g.add(box(0.42, 0.26, BK.ink, 1.3, 0.02, 0.01)); return g; }
      function bossSay(msg, ms) {
        toast.textContent = msg; toast.classList.add("is-on"); clearTimeout(bossToastT);
        bossToastT = setTimeout(() => { if (state === "play") toast.classList.remove("is-on"); }, ms || 1400);
      }
      function bossBar() { document.querySelectorAll("#bossBar i").forEach((s, j) => s.classList.toggle("is-off", !!boss && j >= 4 - boss.hits)); }
      function setupBoss(i, at, btns) {
        boss = null; document.getElementById("bossBar").hidden = !at; if (!at) { hideHint(); bossDied = false; return; }
        const k = kuklaMesh(), xs = btns.map((b) => b.x).concat(at.x);
        k.g.position.set(at.x, at.cy + 2.4, -1); level.add(k.g);
        boss = Object.assign(k, { x: at.x, y: at.cy + 2.4, fy: at.cy, L: Math.min(...xs) - 3, R: Math.max(...xs) + 3, z: zoneOf(i), hits: 0, st: "wait",
          atkT: 1.4, n: 0, glowT: 1, btns, haz: [], bag: null, shk: 0, talk: 0, kick: 0, vy: 0, fallT: 0, landed: false, teeth: null });
        if (flag) { flag.locked = true; flag.mesh.visible = false; }
        bossBar();
      }
      function bossAttack(k) {
        const x = Math.max(k.L, Math.min(k.R, p.x)), red = (o) => new THREE.MeshBasicMaterial({ color: 0xff1a1a, transparent: true, opacity: o, depthWrite: false });
        const sw = BOSS_CFG[levelIdx]?.sweep, easy = !!BOSS_CFG[levelIdx]?.easy; // sweep boss: sweeps on even n, or on odd n in rage (drops on even)
        if (sw ? k.n % 2 === (k.rage ? 1 : 0) : k.z >= 5 && k.n % 3 === 0) { // low sweep of Kukla's leg across the floor: a red line warns for 0.5 s (easy: 0.8 s)
          const dir = Math.sign(x - k.x) || 1, ln = box(16, 0.08, red(0.6), x, k.fy + 0.04, 1.5); level.add(ln);
          k.haz.push({ leg: true, x: x - dir * 8, x1: x + dir * 8, dir, t: easy ? 0.8 : 0.5, ln, ms: [ln] }); k.kick = 1.3; SFX.creak();
        } else { // a red shadow on the floor for 0.6 s (easy: 0.95 s), then this zone's object falls there
          const wt = BOSS_CFG[levelIdx]?.fast ? 0.4 : easy ? 0.95 : 0.6;
          for (const dx of k.rage ? (easy ? [-1.5, 1.5] : [-2.5, 0, 2.5]) : [0]) { // rage: three drops side by side (easy: two)
            let hx = Math.max(k.L, Math.min(k.R, x + dx));
            if (easy && k.rage) { // easy: never right on top of a glowing button
              for (const b of k.btns) if (b.glow > 0 && Math.abs(hx - b.x) < 1) hx = b.x + (hx >= b.x ? 1 : -1);
              hx = Math.max(k.L, Math.min(k.R, hx));
            }
            const sh = circle(0.45, red(0.3), hx, k.fy + 0.03, 1.45); sh.scale.y = 0.2; level.add(sh);
            k.haz.push({ x: hx, t: wt, wt, sh, ms: [sh] });
          }
          SFX.tick();
        }
      }
      function bossHit(k) {
        const s = k.strings[k.hits]; s.visible = false; k.hits++; bossBar();
        const piece = box(0.03, 4, BK.string); piece.position.set(k.x + s.position.x, k.y + s.userData.y0 + 2, 0);
        addBit(piece, { vx: rnd(-1, 1), vy: 2, spin: rnd(-2, 2), z: -0.9, life: 1.5 });
        const bm = bagMesh(); bm.position.set(k.x, k.y + 3.1, 0); addBit(bm, { vx: rnd(-3, 3), vy: 6, spin: rnd(-6, 6), z: -0.8, life: 1.4 });
        hitT = 0.12; shakeT = 0.45; k.shk = 0.8; k.talk = 1.2; buzz(80); SFX.bang(); SFX.creak();
        if (k.hits === 2 && BOSS_CFG[levelIdx]?.rage) { // halfway: rage phase
          k.rage = true; shakeT = 0.6; bossSay(T("Yeter artık nine! Şimdi çıldırdım!"), 2000);
          const rm = new THREE.MeshBasicMaterial({ color: 0xff1a1a }); k.g.traverse((o) => { if (o.material === BK.iris) o.material = rm; });
          return;
        }
        if (k.hits < 4) { bossSay(T(TAUNTS[k.hits - 1])); return; }
        k.st = "down"; k.vy = 2; k.strings.forEach((q) => { q.visible = false; });
        k.haz.forEach((h) => h.ms.forEach((m) => { level.remove(m); freeObj(m); })); k.haz = [];
        k.btns.forEach((b) => { b.glow = 0; b.m.userData.glow.visible = false; b.m.userData.arrow.visible = false; });
        hideHint(); bossSay(T("Kukla düştü!"), 2200); SFX.crash();
        sdkCall((s) => s.game.happytime());
      }
      function updateBoss(dt) {
        const hi = !!(boss && boss.st === "fight");
        if (droneG && hi !== droneHi) { droneHi = hi; droneG.gain.setTargetAtTime(hi ? 0.18 : 0.07, AC.currentTime, 0.6); }
        if (!boss) return;
        const k = boss, play = state === "play";
        if (k.st === "wait" && play && p.x > k.L) { k.st = "fight"; SFX.laugh(); showHint(bossDied ? 3000 : 5000); bossDied = false; k.idle = 0; }
        if (k.st === "fight" && play) { k.idle += dt; if (k.idle >= 10) { k.idle = 0; showHint(3000); } } // 10 s without a press: remind her
        if (k.st === "fight") {
          danger = Math.min(danger, 2.5); // louder, faster heartbeat for the whole fight
          const easy = !!BOSS_CFG[levelIdx]?.easy; // boss 10: slower, longer warnings, longer glows
          k.x += (Math.max(k.L + 2, Math.min(k.R - 2, p.x + Math.sin(lt * 0.6) * 2.5)) - k.x) * Math.min(1, dt * 0.7 * (k.rage ? 2 : 1) * (easy ? 0.5 : 1));
          k.y = k.fy + 2.4 + Math.sin(lt * 1.3) * 0.25;
          if (play) {
            k.atkT -= dt;
            if (k.atkT <= 0) { k.n++; k.atkT = Math.max(0.7, 1.6 - k.z * 0.06 - k.hits * 0.15) * (k.rage ? (easy ? 0.85 : 0.6) : 1) * (easy ? 1.6 : 1); bossAttack(k); }
            k.glowT -= dt;
            if (k.glowT <= 0) { // light a button she can reach in the 2.5 s glow (≤ 12 tiles at run speed); else the nearest one
              k.glowT = easy ? 3 : 4; const free = k.btns.filter((b) => !b.used && b.glow <= 0);
              if (free.length) {
                const near = free.filter((b) => Math.abs(b.x - p.x) <= 12);
                const pick = near.length ? near[Math.floor(R() * near.length)] : free.reduce((a, b) => (Math.abs(b.x - p.x) < Math.abs(a.x - p.x) ? b : a));
                pick.glow = easy ? (k.rage ? 3.0 : 3.5) : k.rage ? 2.0 : 2.5; SFX.ding();
              }
            }
          }
          BK.glow.opacity = 0.3 + 0.2 * Math.sin(lt * 12);
          for (const b of k.btns) {
            if (b.glow <= 0) continue;
            b.glow -= dt; const on = b.glow > 0; b.m.userData.glow.visible = on; b.m.userData.cap.material = on ? BK.capG : BK.cap;
            const ar = b.m.userData.arrow; ar.visible = on; ar.position.y = 1.7 + Math.abs(Math.sin(lt * 6)) * 0.35;
            if (on && play && !k.bag && p.onGround && Math.abs(p.x - b.x) < 0.45 && p.y - HH < b.cy + 0.3) { // stepped on: a sandbag drops onto Kukla
              b.glow = 0; b.used = true; b.m.userData.glow.visible = false; ar.visible = false; k.idle = 0; b.m.userData.cap.material = BK.capOff; b.m.userData.cap.position.y = 0.42;
              SFX.click(); k.bag = { m: bagMesh(), y: k.y + 9, vy: -4 }; level.add(k.bag.m);
            }
          }
          if (k.bag) { const g = k.bag; g.vy -= GRAV * dt; g.y += g.vy * dt; g.m.position.set(k.x, g.y, -0.8); if (g.y <= k.y + 3.05) { level.remove(g.m); k.bag = null; bossHit(k); } }
          for (let j = k.haz.length - 1; j >= 0; j--) {
            const h = k.haz[j]; h.t -= dt; let done = false;
            if (h.leg) {
              if (!h.m) { h.ln.material.opacity = 0.35 + 0.35 * Math.sin(lt * 30); if (h.t <= 0) { h.m = BOSS_CFG[levelIdx]?.wave ? waveMesh() : BOSS_CFG[levelIdx]?.sweep ? cleaverMesh() : legSweepMesh(); h.m.scale.x = h.dir; level.add(h.m); h.ms.push(h.m); level.remove(h.ln); SFX.whoosh(1); } continue; }
              h.x += h.dir * 18 * dt; h.m.position.set(h.x, k.fy + 0.22 + (h.m.userData.bob ? Math.sin(lt * 10) * 0.06 : 0), 1.5);
              if (h.m.userData.spin) h.m.userData.spin.rotation.z -= dt * 14;
              if (play && overlap(p.x, p.y, HW, HH, h.x, k.fy + 0.22, 1.2, 0.16)) die("arrow", h.dir);
              done = (h.x - h.x1) * h.dir > 0;
            } else {
              if (!h.m) {
                const fast = BOSS_CFG[levelIdx]?.fast, q = Math.min(1, 1 - h.t / (h.wt || (fast ? 0.4 : 0.6))); h.sh.scale.set(0.5 + 0.6 * q, 0.2 * (0.5 + 0.6 * q), 1); h.sh.material.opacity = 0.3 + 0.4 * q;
                if (h.t <= 0) { h.m = bossHazMesh(k.z); h.y = k.fy + 7; h.vy = fast ? -10 : -6; h.m.position.set(h.x, h.y, 1.5); level.add(h.m); h.ms.push(h.m); }
                continue;
              }
              if (!h.land) { h.vy -= GRAV * dt; h.y = Math.max(k.fy, h.y + h.vy * dt); if (h.y === k.fy) { h.land = true; h.t = 0.4; SFX.crash(); shakeT = Math.max(shakeT, 0.1); } }
              if (h.m.userData.spin) h.m.userData.spin.rotation.z += dt * 8;
              h.m.position.y = h.y;
              if (play && overlap(p.x, p.y, HW, HH, h.x, h.y + 0.35, 0.3, 0.35)) die(BOSS_KILL[k.z], Math.sign(p.x - h.x) || 1);
              done = h.land && h.t <= 0;
            }
            if (done) { h.ms.forEach((m) => { level.remove(m); freeObj(m); }); k.haz.splice(j, 1); }
          }
        }
        // pose: dangles on its strings, droops as they snap; after the 4th hit it drops and lies limp
        k.shk = Math.max(0, k.shk - dt); k.talk = Math.max(0, k.talk - dt); k.kick = Math.max(0, k.kick - dt);
        k.jaw.position.y = 0.24 - (k.talk > 0 ? Math.abs(Math.sin(lt * 22)) * 0.09 : 0);
        if (k.st !== "down") {
          const h = k.hits;
          k.g.position.set(k.x + (k.shk ? Math.sin(lt * 60) * 0.15 * k.shk : 0), k.y, -1);
          k.g.rotation.z = Math.sin(lt * 0.9) * 0.05 + [0, 0.07, -0.05, -0.12][h];
          k.arms.forEach((a, j) => { const cut = j ? h > 2 : h > 0; a.rotation.z = (j ? 1 : -1) * (cut ? 0.05 : 0.35) + Math.sin(lt * 1.7 + j) * (cut ? 0.25 : 0.1); });
          k.head.rotation.z = (h > 1 ? -0.3 : 0) + Math.sin(lt * 1.1) * 0.06;
          k.legs.forEach((l, j) => { l.rotation.z = k.kick > 0 ? (j ? 1 : -1) * 0.9 : Math.sin(lt * 2 + j * 2) * 0.12; });
          return;
        }
        if (!k.landed) {
          k.vy -= GRAV * 0.6 * dt; k.y += k.vy * dt; k.fallT = Math.min(1, k.fallT + dt * 1.8);
          if (k.y <= k.fy + 0.5) {
            k.y = k.fy + 0.5; k.fallT = 1; k.landed = true; SFX.bang(); shakeT = 0.5; buzz(120);
            const tm = teethMesh(); tm.scale.setScalar(1.3); level.add(tm); SFX.chatter(); // Nine's dentures pop out of its mouth
            k.teeth = { m: tm, x: k.x + 2.5, y: k.fy + 0.6, vx: 1.6, vy: 7 };
            if (flag) { flag.locked = false; flag.mesh.visible = true; flag.mesh.scale.y = 0.01; }
          }
        }
        k.g.position.set(k.x, k.y, -1); k.g.rotation.z = -Math.PI / 2 * k.fallT * k.fallT;
        k.arms.forEach((a, j) => { a.rotation.z = (j ? -1.3 : 0.4) * k.fallT; }); k.legs.forEach((l, j) => { l.rotation.z = (j ? 0.25 : -0.15) * k.fallT; }); k.head.rotation.z = 0.35 * k.fallT;
        if (flag && !flag.locked && flag.mesh.scale.y < 1) flag.mesh.scale.y = Math.min(1, flag.mesh.scale.y + dt * 4);
        const t = k.teeth;
        if (t) {
          if (t.vy || t.y > k.fy) { t.vy -= GRAV * dt; t.x += t.vx * dt; t.y += t.vy * dt; t.m.rotation.z += t.vx * dt * 3; }
          if (t.y <= k.fy) { t.y = k.fy; t.vy = Math.abs(t.vy) > 2.5 ? -t.vy * 0.35 : 0; t.vx *= 0.5; if (!t.vy) { t.vx = 0; t.m.rotation.z = 0; } }
          t.m.userData.up.rotation.z = t.vy ? 0 : Math.abs(Math.sin(lt * 14)) * 0.25; t.m.position.set(t.x, t.y, 1.2);
        }
      }

      /* ===== Level building ===== */
      function buildLevel(i) {
        if (_geoBase === Infinity) markBase();
        while (level.children.length) { const o = level.children[0]; level.remove(o); freeObj(o); } // dispose the old level's own geometries and materials
        applyZone(zoneOf(i)); // levels 1–5 Bodrum, 6–10 Huzurevi, ...
        grid = LEVELS[i]; H = grid.length; mod = modOf(i); if (!reached.has(i)) { reached.add(i); sdkSave(); } W = Math.max(...grid.map((r) => r.length));
        fakes = {}; spikes = []; launchers = []; triggers = []; arrows = []; barrels = []; fx = []; ropes = []; bits = []; balls = []; crates = [];
        saws = []; plats = []; lt = 0; bulbs = []; bears = []; blades = []; spikeWalls = [];
        chairs = []; chompers = []; baskets = []; needles = []; pots = []; rugs = [];
        plates = []; gurneys = []; ivs = []; adoors = []; elecT = 0; elecOn = false; humT = 0;
        syringes = []; bottles = []; pills = []; carts = []; defibs = [];
        meatHooks = []; cleaverBlocks = []; cleavers = []; grinders = []; carcasses = [];
        freezers = []; sausages = []; belts = []; slideDirs = {}; beltDirs = {}; meatballs = [];
        bumpers = []; jacks = []; wheels = []; cabins = []; balloons = [];
        coasters = []; candies = []; mirrorPanes = []; targets = []; darts = [];
        ratPacks = []; manholes = []; crocs = []; sewers = []; pipes = []; drops = [];
        presses = []; welders = []; gears = []; lasers = []; cranes = []; crateBlocks = {};
        fanBlades = []; ratKings = []; sparkers = []; ramps = [];
        icicles = []; snowballs = []; fans = []; icePresses = []; windPush = 0;
        trains = []; thirdRails = []; mdoors = []; railHum = 0; escalators = []; turnstiles = []; cables = [];
        spots = []; puppetHands = []; tdoors = []; stageOpen = {};
        camCranes = []; cannons = []; cshots = []; fdoors = []; turns = []; curtains = [];
        boilers = []; shelves = []; mtraps = []; swingBulbs = [];
        spiders = []; washers = []; socks = []; stairSteps = []; flipBoards = []; pjars = [];
        droppers = []; penguins = []; duckRails = []; bossAt = null; bossBtns = [];
        checkpoints = []; cpSpawn = null; if (cpActive && cpActive.lvl !== i) cpActive = null;
        for (let bx = 4.5; bx < W; bx += 9) addBulb(bx, 7.7 + ((bx * 7) % 3) * 0.2);
        surprises = []; crushers = []; birds = []; doors = {}; doorCols = {}; flaps = []; scareEnd = 0; scareFace.visible = false;
        for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
          const t = grid[r][c] || " ", x = c + 0.5, y = H - 1 - r + 0.5, cy = H - 1 - r;
          if (isGroundChar(t)) {
            const g = new THREE.Group(); g.position.set(x, y, 0);
            g.add(box(1.01, 1.01, (c + r) % 2 ? MAT.dirt : MAT.dirt2));
            if (!isGroundChar(tile(c, cy + 1)) && tile(c, cy + 1) !== "~") {
              // worn concrete lip with rust running down from it
              g.add(box(1.01, 0.12, MAT.grass, 0, 0.445, 0.01));
              const dx = -0.3 + ((c * 7) % 5) * 0.14, dl = 0.18 + ((c * 13) % 4) * 0.08;
              g.add(box(0.07, dl, MAT.tuft, dx, 0.39 - dl / 2, 0.02));
            }
            const sh = (c * 31 + r * 17) % 7; // rust stains on some blocks
            if (sh < 2) { const st = circle(0.16 + sh * 0.07, MAT.rust, -0.2 + ((c * 3) % 4) * 0.12, -0.2 + ((r * 5) % 3) * 0.15, 0.015); st.scale.y = 0.6; g.add(st); }
            if (t === "A") g.add(box(0.36, 0.06, MAT.slit, 0, 0, 0.02));
            if (t === "u") [[-0.2, 0.25, 0.7], [0.15, 0.05, -0.6], [0.05, -0.25, 0.9]].forEach(([a, b, rz]) => { const k = box(0.4, 0.04, MAT.black, a, b, 0.02); k.rotation.z = rz; g.add(k); }); // cracks
            level.add(g); statics.push(g);
            if (t === "F" || t === "u") fakes[c + "," + cy] = { mesh: g, timer: -1, fallen: false, vy: 0, delay: t === "u" ? 0.5 : 0.22 };
            if (t === "A") launchers.push({ x, y });
            // trap-door column (under a k trigger): a black pit hides behind the ground, opened later
            const dk = doorCols[c] !== undefined && cy < doorCols[c];
            if (dk) {
              doors[c + "," + cy] = { mesh: g, open: false, top: cy === doorCols[c] - 1 };
              level.add(stat(box(1.01, 1.01, MAT.black, x, y, -0.02)));
              if (r === H - 1) level.add(stat(box(1.01, 8, MAT.black, x, y - 4.5, -0.02)));
            }
            // extend solid ground downward so the world has no floating floor
            if (r === H - 1 && t !== "F" && t !== "u" && !dk) level.add(stat(box(1.01, 8, MAT.dirt2, x, y - 4.5, -0.01)));
          } else if (t === "~" || t === "5") {
            const top = !"~5".includes(tile(c, cy + 1));
            if (t === "5") { // crocodile under the surface: eyes peek out, bubbles rise
              const m = crocMesh(); m.position.set(x, cy + 0.72, 0.25); level.add(m);
              const bubs = [0, 1, 2].map((k) => { const b = circle(0.05 + k * 0.015, KN.bub, x, cy + 0.85, 0.36); level.add(b); return b; });
              crocs.push({ x, y: cy, st: "wait", t: 0, mesh: m, bubs });
            }
            level.add(stat(box(1.01, top ? 0.8 : 1.01, MAT.water, x, top ? y - 0.1 : y, 0.3)));
            if (top) level.add(stat(box(1.01, 0.06, MAT.foam, x, y + 0.29, 0.31)));
            if (r === H - 1) level.add(stat(box(1.01, 8, MAT.water, x, y - 4.5, 0.3)));
          } else if (t === "V") {
            const m = tri([-0.35, 0.5, 0.35, 0.5, 0, -0.4], MAT.spike, 0.5);
            m.add(tri([0, 0.5, 0.35, 0.5, 0, -0.4], MAT.spikeDark, 0.01));
            m.position.set(x, y, 0.5); level.add(m);
            spikes.push({ x, y, vy: 0, state: "idle", mesh: m });
          } else if (t === "T") {
            const m = new THREE.Mesh(pg(0.7, 0.81), tntMat);
            m.position.set(x, cy + 0.41, 0.5); level.add(m);
            barrels.push({ x, y: cy + 0.4, mesh: m, live: true });
          } else if (t === "R" || t === "S") {
            // Pendulum rope hanging from a wooden beam; S has a worn spot and snaps
            const L = Math.max(2, y - 3.9);
            level.add(box(1.3, 0.2, MAT.beam, x, y + 0.1, 1.7));
            const g = new THREE.Group(); g.position.set(x, y, 1.8);
            g.add(box(0.07, L, MAT.rope, 0, -L / 2, 0)); g.add(circle(0.09, MAT.ropeKnot, 0, -L, 0.01));
            if (t === "S") g.add(box(0.1, 0.07, MAT.fray, 0, -0.4, 0.01));
            level.add(g);
            ropes.push({ x, y, len: L, th: ropes.length % 2 ? 0.18 : -0.18, w: 0, held: false, hold: L,
              snaps: t === "S", swings: 0, lastSign: 0, snapped: false, vy: 0, mesh: g });
          } else if (t === "O") {
            const g = new THREE.Group(), r = 0.7;
            g.add(circle(r, MAT.stoneDark)); g.add(circle(r * 0.92, MAT.stone, 0, 0, 0.01));
            [[0.3, 0.2, 0.12], [-0.25, -0.3, 0.1], [-0.2, 0.32, 0.07], [0.15, -0.2, 0.06]].forEach(([a, b, s]) => g.add(circle(s, MAT.stoneDark, a, b, 0.02)));
            g.position.set(x, cy + r, 1.9); level.add(g);
            balls.push({ x, y: cy + r, r, vx: 0, vy: 0, st: "wait", mesh: g });
          } else if (t === "ж") { // checkpoint: wooden rocking chair with a knitted blanket and a small lamp
            const g = checkpointMesh(); g.position.set(x, cy, 0.3); level.add(g);
            const key = c + "," + cy, on = !!(cpActive && cpActive.lvl === i && cpActive.key === key);
            const ck = { x, y: cy, key, lit: false, mesh: g }; checkpoints.push(ck);
            if (on) { cpLight(ck); cpSpawn = ck; }
          } else if (t === "K") {
            const g = new THREE.Group(); g.add(box(1.6, 1, MAT.crateDark)); g.add(box(1.5, 0.9, MAT.crate, 0, 0, 0.01));
            for (let k = -2; k <= 2; k++) g.add(box(0.06, 0.8, MAT.crateDark, k * 0.28, 0, 0.02));
            g.position.set(c + 0.8, cy + 0.5, 1.2); level.add(g);
            crates.push({ x: c + 0.8, y: cy + 0.5, hw: 0.8, hh: 0.5, vy: 0, mesh: g });
          } else if (t === "X" || t === "Z" || t === "z") {
            // X: saw on a pole; Z: slides on a rail slot; z: hidden in the ground, pops up
            const r = 0.5, hy = t === "X" ? cy + 1 : cy + 0.15, y0 = t === "z" ? cy - 0.6 : hy, m = sawMesh(r);
            if (t === "X") level.add(box(0.1, 1, MAT.spikeDark, x, cy + 0.5, 0.9));
            if (t === "Z") level.add(box(5.6, 0.08, MAT.black, x, cy + 0.02, 0.05));
            m.position.set(x, y0, t === "X" ? 1 : -0.05); level.add(m);
            saws.push({ x, y: y0, bx: x, hy, r, t, ph: c * 0.9, up: t !== "z", mesh: m });
          } else if (t === "=" || t === "^" || t === "_") {
            // chain-hung striped platform, 2 cells wide, top level with the cell's top
            const g = new THREE.Group(); g.add(box(2, 0.3, stripeMat));
            [-0.75, 0.75].forEach((dx) => g.add(box(0.12, CHAIN_L, chainMat, dx, CHAIN_L / 2, -0.01)));
            g.position.set(c + 1, cy + 0.85, 1.3); level.add(g);
            plats.push({ x: c + 1, y: cy + 0.85, bx: c + 1, by: cy + 0.85, t, ph: c * 0.7, drop: null, vy: 0, fallen: false, mesh: g });
          } else if (t === "Y") {
            // Ayı Kapanı: two toothed steel jaws lying open on the floor
            const g = new THREE.Group(), jaws = [];
            g.add(box(0.95, 0.07, MAT.spikeDark, 0, 0.035, 0)); g.add(circle(0.09, MAT.saw, 0, 0.06, 0.03));
            [-1, 1].forEach((s) => {
              const j = new THREE.Group(); j.position.set(0, 0.06, 0.02); j.scale.x = -s;
              j.add(box(0.42, 0.05, MAT.saw, -0.25, 0, 0));
              for (let k = 0; k < 4; k++) { const dx = -0.42 + k * 0.1; j.add(tri([dx - 0.045, 0, dx + 0.045, 0, dx, 0.16], MAT.spike, 0.01)); }
              g.add(j); jaws.push({ m: j, to: s * 1.45 });
            });
            g.position.set(x, cy, 0.6); level.add(g);
            bears.push({ x, y: cy, jaws, shut: false });
          } else if (t === "L") {
            // Sarkaç: rusty curved blade on a long arm, swinging from a ceiling beam
            let gy = cy; while (gy > 0 && !isGroundChar(tile(c, gy - 1))) gy--;
            // crescent ~2 tiles wide; its lowest point (D below the arm's end) hangs 0.6 tiles above the floor tile
            const R = 1.45, D = 0.3, py = y + 0.1, L = py - gy - 0.6 - D;
            level.add(box(1.3, 0.2, MAT.beam, x, py, 1.7));
            const g = new THREE.Group(); g.position.set(x, py, 1.75);
            g.add(box(0.09, L + 0.1, MAT.spikeDark, 0, -(L + 0.1) / 2, 0)); g.add(circle(0.1, MAT.saw, 0, 0, 0.01));
            const cres = (th, mat, z) => { const m = new THREE.Mesh(geoOf("k|" + th + "|" + R + "|" + D, () => { const s = new THREE.Shape(); s.absarc(0, R - D, R, 3.99, 5.43, false); s.absarc(0, R - D + th, R, 5.43, 3.99, true); return new THREE.ShapeGeometry(s); }), mat); m.position.set(0, -L, z); return m; };
            g.add(cres(0.25, MAT.spike, 0.02)); g.add(cres(0.35, MAT.tuft, 0.03));
            [[-0.4, -L - 0.1], [0.35, -L - 0.08]].forEach(([a, b]) => g.add(circle(0.07, MAT.rust, a, b, 0.04)));
            level.add(g);
            blades.push({ x, py, L, ph: c * 0.6, a: 0, sg: 0, mesh: g });
          } else if (t === "D") {
            // Dikenli Duvarlar: two rusty spiked walls waiting 3 tiles either side of the meeting point
            const m = x + 1, walls = [-1, 1].map((s) => {
              const g = new THREE.Group();
              g.add(box(0.5, 2.6, MAT.crateDark, -0.25, 1.3, 0)); g.add(box(0.4, 2.5, MAT.tuft, -0.25, 1.3, 0.01));
              [0.4, 1.3, 2.2].forEach((ry) => { g.add(circle(0.05, MAT.spikeDark, -0.4, ry, 0.02)); g.add(circle(0.05, MAT.spikeDark, -0.1, ry, 0.02)); });
              [[-0.3, 0.8, 0.12], [-0.2, 1.9, 0.09]].forEach(([a, b, r]) => g.add(circle(r, MAT.rust, a, b, 0.02)));
              for (let k = 0; k < 6; k++) { const yy = 0.15 + k * 0.42; g.add(tri([0, yy, 0, yy + 0.3, 0.3, yy + 0.15], k % 2 ? MAT.spikeDark : MAT.spike, 0.01)); }
              g.scale.x = -s; g.position.set(m + s * 3, cy + 1, 1.6); level.add(g);
              return g;
            });
            spikeWalls.push({ x, m, by: cy + 1, walls, t: -1, gr: 0, shut: false });
          } else if (t === "W") { // empty wheelchair parked on the floor, waiting
            const m = chairMesh(); m.scale.x = -1; m.position.set(x, cy, 1.1); level.add(m);
            chairs.push({ x, y: cy, vx: 0, vy: 0, st: "wait", sq: 0, dist: 0, mesh: m });
          } else if (t === "t") { // wind-up false teeth
            const m = teethMesh(); m.scale.x = -1; m.position.set(x, cy, 1.1); level.add(m);
            chompers.push({ x, y: cy, vx: 0, vy: 0, st: "wait", hop: 0, dir: -1, mesh: m });
          } else if (t === "n") { // knitting basket on a wall shelf; fires a needle every 1.6 s
            const g = new THREE.Group();
            g.add(box(0.08, 1.2, HM.basketD, -0.3, 0.6, -0.02)); g.add(box(0.8, 0.07, MAT.wood, 0, 0.42, 0)); // post and shelf
            g.add(tri([-0.3, 0.38, -0.3, 0.2, -0.12, 0.38], MAT.woodD, 0.005)); // bracket
            const b = new THREE.Group(); b.position.set(0, 0.46, 0.02);
            b.add(box(0.5, 0.26, HM.basket, 0, 0.13, 0)); [0.05, 0.13, 0.21].forEach((yy) => b.add(box(0.5, 0.02, HM.basketD, 0, yy, 0.01)));
            b.add(circle(0.11, HM.yarn, -0.09, 0.3, -0.01)); b.add(circle(0.09, HM.yarn2, 0.11, 0.29, -0.01));
            const st = box(0.5, 0.025, HM.needle, 0.05, 0.36, -0.015); st.rotation.z = 0.5; b.add(st);
            g.add(b); g.position.set(x, cy, 0.8); level.add(g);
            baskets.push({ x, y: cy + 0.55, t: 1.6 - ((c * 0.37) % 1.2), b, mesh: g });
          } else if (t === "w") { // wet floor: a shiny puddle on the floor top, the sign at the start of the run
            level.add(box(1.01, 0.05, HM.wet, x, cy + 0.025, 0.05));
            if (tile(c - 1, cy) !== "w") { const sg = box(0.6, 0.8, signMat, x - 0.2, cy + 0.4, 0.7); level.add(sg); }
          } else if (t === "s") { // flowerpot on a high window ledge
            level.add(box(0.9, 1.1, HM.frame, x, cy + 0.6, -0.04)); level.add(box(0.74, 0.94, HM.glass, x, cy + 0.62, -0.035));
            level.add(box(0.06, 0.94, HM.frame, x, cy + 0.62, -0.03)); level.add(box(1.1, 0.1, HM.frame, x, cy + 0.03, 0.2));
            const g = new THREE.Group();
            g.add(tri([-0.17, 0, 0.17, 0, 0.22, 0.3, -0.22, 0.3], HM.pot, 0)); g.add(box(0.5, 0.07, HM.potD, 0, 0.3, 0.01));
            [[-0.12, 0.45, 0.6], [0.1, 0.48, -0.5], [0, 0.55, 0]].forEach(([a, b2, r]) => { const l = circle(0.09, HM.leaf, a, b2, -0.01); l.scale.x = 0.55; l.rotation.z = r; g.add(l); });
            g.add(circle(0.07, HM.bloom, 0, 0.62, 0.005));
            g.position.set(x, cy + 0.08, 0.6); level.add(g);
            pots.push({ x, y: cy + 0.08, y0: cy + 0.08, vy: 0, st: "wait", t: 0, mesh: g });
          } else if (t === "h") { // rug lying on the floor
            const g = new THREE.Group();
            g.add(box(1.6, 0.06, HM.rugD, 0, 0.03, 0)); g.add(box(1.5, 0.04, HM.rug, 0, 0.035, 0.01)); g.add(box(1.2, 0.012, HM.rugGold, 0, 0.035, 0.02));
            for (let k = 0; k < 4; k++) { g.add(box(0.02, 0.05, HM.rugGold, -0.82, 0.01 + k * 0.012, 0.02)); g.add(box(0.02, 0.05, HM.rugGold, 0.82, 0.01 + k * 0.012, 0.02)); }
            g.position.set(x, cy, 0.5); level.add(g);
            rugs.push({ x, y: cy, off: 0, t: 0, mesh: g });
          } else if (t === "E") { // electric floor plate; the glow shows when it is live
            level.add(box(1.0, 0.07, HP.plateD, x, cy + 0.035, 0.5)); level.add(box(0.9, 0.05, HP.plate, x, cy + 0.04, 0.51));
            level.add(box(0.86, 0.035, HP.glow, x, cy + 0.06, 0.52));
            plates.push({ x, y: cy });
          } else if (t === "C") { // stretcher on a 5-tile floor track
            level.add(box(5, 0.05, MAT.black, x, cy + 0.02, 0.05));
            const m = gurneyMesh(); m.position.set(x, cy, 1.1); level.add(m);
            gurneys.push({ x, bx: x, y: cy, ph: c * 0.5, dir: 0, mesh: m });
          } else if (t === "I") { // IV pole standing on the floor
            const m = ivMesh(); m.position.set(x, cy, 1.0); level.add(m);
            ivs.push({ x, y: cy, st: "wait", t: 0, a: 0, w: 0, dir: 1, mesh: m });
          } else if (t === "Q") { // automatic sliding door: header with a lamp, two glass panels
            level.add(box(0.12, 2.5, HP.doorF, x - 1.4, cy + 1.25, 0.2)); level.add(box(0.12, 2.5, HP.doorF, x + 1.4, cy + 1.25, 0.2));
            level.add(box(2.92, 0.3, HP.doorF, x, cy + 2.55, 0.25));
            const lampMat = M(0x3a1010), lamp = circle(0.09, lampMat, x, cy + 2.55, 0.26); level.add(lamp);
            const L = box(0.5, 2.4, HP.door, x - 1.15, cy + 1.2, 0.3), Rp = box(0.5, 2.4, HP.door, x + 1.15, cy + 1.2, 0.3);
            level.add(L, Rp);
            adoors.push({ x, y: cy, t: (c * 0.37) % 2.5, k: 0, red: false, lamp: lampMat, L, R: Rp });
          } else if (t === "v") { // ceiling rack with 3 syringes hanging needle-down
            level.add(box(1.2, 0.1, HP.frame, x, y + 0.45, 0.45)); level.add(box(0.05, 3, HP.frame, x, y + 2, 0.44));
            const set = { cl: [] };
            [-0.35, 0, 0.35].forEach((dx) => {
              const m = syringeMesh(); m.position.set(x + dx, y + 0.4, 0.5); level.add(m);
              const s = { x: x + dx, y: y + 0.4, vy: 0, st: "idle", warn: 0, mesh: m, set }; set.cl.push(s); syringes.push(s);
            });
          } else if (t === "H") { // giant pill bottle on the floor
            const m = bottleMesh(); m.position.set(x, cy, 0.4); level.add(m);
            bottles.push({ x, y: cy, t: (c * 0.29) % 2, lidT: 0, mesh: m });
          } else if (t === "B") { // lift platform, 2 cells wide, with a warning lamp; drops after 3 beeps
            const g = new THREE.Group(); g.add(box(2, 0.3, HP.plateD)); g.add(box(2, 0.08, HP.frame, 0, 0.11, 0.01));
            [-0.85, 0.85].forEach((dx) => g.add(box(0.06, CHAIN_L, HP.frame, dx, CHAIN_L / 2, -0.01)));
            const lamp = M(0x3a1010); g.add(box(0.3, 0.14, HP.doorF, 0, 0.26, 0.02)); g.add(circle(0.07, lamp, 0, 0.26, 0.03));
            g.position.set(c + 1, cy + 0.85, 1.3); level.add(g);
            plats.push({ x: c + 1, y: cy + 0.85, bx: c + 1, by: cy + 0.85, t, ph: 0, drop: null, vy: 0, fallen: false, mesh: g, lamp, beeps: 0 });
          } else if (t === "U") { // food tray cart, waiting
            const m = cartMesh(); m.position.set(x, cy, 1.1); level.add(m);
            carts.push({ x, y: cy, vx: 0, vy: 0, st: "wait", rt: 0, dist: 0, dir: -1, mesh: m });
          } else if (t === "J") { // meat hook on a 5-tile ceiling rail at head height
            level.add(box(5, 0.1, KS.steelD, x, cy + 3.45, 0.9));
            [-2.4, 2.4].forEach((dx) => level.add(box(0.06, 0.6, KS.steelD, x + dx, cy + 3.75, 0.89)));
            const m = hookMesh(); m.position.set(x, cy + 0.9, 1.0); level.add(m);
            meatHooks.push({ x, bx: x, y: cy + 0.9, ph: c * 0.8, dir: 0, mesh: m });
          } else if (t === "c") { // butcher block with a cleaver on a wall post
            const g = new THREE.Group();
            g.add(box(0.08, 1.2, KS.blockD, -0.3, 0.6, -0.02)); g.add(box(0.8, 0.07, MAT.wood, 0, 0.42, 0));
            g.add(tri([-0.3, 0.38, -0.3, 0.2, -0.12, 0.38], MAT.woodD, 0.005));
            g.add(box(0.56, 0.3, KS.block, 0, 0.61, 0.01)); [0.5, 0.6, 0.7].forEach((yy) => g.add(box(0.56, 0.015, KS.blockD, 0, yy, 0.015)));
            const cl = cleaverMesh(); cl.position.set(0.02, 0.86, 0.005); cl.rotation.z = -0.3; g.add(cl);
            const gm = M(0xffffff, { transparent: true, opacity: 0 }), gl = new THREE.Group();
            gl.position.set(0.1, 0.92, 0.03); gl.add(box(0.26, 0.04, gm)); gl.add(box(0.04, 0.26, gm)); g.add(gl);
            g.position.set(x, cy, 0.8); level.add(g);
            cleaverBlocks.push({ x, y: cy + 0.6, t: 1.8 - ((c * 0.41) % 1.3), cl, gl, gm, mesh: g });
          } else if (t === "g") { // meat grinder at the bottom of a pit: two counter-rotating toothed rollers
            let l = c, rr = c;
            while (l > 0 && (tile(l - 1, cy + 1) === " " || tile(l - 1, cy + 1) === "u")) l--;
            while (rr < W - 1 && (tile(rr + 1, cy + 1) === " " || tile(rr + 1, cy + 1) === "u")) rr++;
            level.add(box(rr - l + 1, 10, MAT.black, (l + rr + 1) / 2, cy - 3, -0.03));
            level.add(tri([l, cy + 1.6, l + 0.15, cy + 1.6, x - 0.9, cy + 0.6, x - 1.05, cy + 0.6], KS.hopper, 0.5));
            level.add(tri([rr + 1, cy + 1.6, rr + 0.85, cy + 1.6, x + 0.9, cy + 0.6, x + 1.05, cy + 0.6], KS.hopper, 0.5));
            const rolls = [-0.45, 0.45].map((dx) => { const m = sawMesh(0.45); m.position.set(x + dx, cy + 0.45, 0.4); level.add(m); return m; });
            grinders.push({ x, y: cy, l, r: rr + 1, rolls, gr: 0 });
          } else if (t === "d") { // cartoon side of meat hanging from a ceiling hook
            const L = 2.3, py = cy + 3.6;
            level.add(box(1.2, 0.12, KS.steelD, x, py + 0.06, 0.95));
            const m = carcassMesh(L); m.position.set(x, py, 1.0); level.add(m);
            carcasses.push({ x, py, L, a: 0, w: 0, st: "wait", t: 0, dir: 1, ph: c * 0.7, mesh: m });
          } else if (t === "o") { // walk-in freezer door: steel frame, the insulated slab parked in a pocket on the left
            level.add(box(0.12, 2.6, KS.steelD, x - 0.36, cy + 1.3, 0.2)); level.add(box(0.12, 2.6, KS.steelD, x + 0.36, cy + 1.3, 0.2));
            level.add(box(1.0, 2.4, KS.frostD, x - 1.05, cy + 1.2, 0.12));
            level.add(box(2.1, 0.3, KS.steel, x - 0.5, cy + 2.55, 0.25)); level.add(box(2.1, 0.05, KS.steelD, x - 0.5, cy + 2.4, 0.26));
            const g = new THREE.Group();
            g.add(box(0.56, 2.38, KS.frost)); [-0.7, 0.7].forEach((dy) => g.add(box(0.5, 0.06, KS.frostD, 0, dy, 0.01)));
            g.add(box(0.06, 0.42, KS.steelD, 0.18, 0, 0.02)); g.add(box(0.12, 0.06, KS.steelD, 0.15, 0.18, 0.02));
            g.position.set(x - 1.05, cy + 1.2, 0.3); level.add(g);
            const mm = M(0xffffff, { transparent: true, opacity: 0 }), mist = new THREE.Group();
            [[-0.2, 0.1, 0.22], [0.15, 0.3, 0.18], [0, 0.6, 0.15]].forEach(([dx, dy, r]) => mist.add(circle(r, mm, dx, dy, 0)));
            mist.position.set(x - 0.5, cy + 0.2, 0.6); level.add(mist);
            freezers.push({ x, y: cy, st: "wait", t: 0, k: 0, mesh: g, mm, mist });
          } else if (t === "r") { // comic ketchup puddle: glossy red smear, a tipped-over bottle at the upstream end
            level.add(box(1.01, 0.05, KS.ketchup, x, cy + 0.025, 0.05));
            const hl = circle(0.08, KS.ketchupL, x - 0.25 + ((c * 7) % 4) * 0.15, cy + 0.045, 0.06); hl.scale.y = 0.35; level.add(hl);
            if (tile(c - 1, cy) !== "r") {
              let rr = c; while (tile(rr + 1, cy) === "r") rr++;
              const dir = hazDir(c, rr, cy);
              for (let k = c; k <= rr; k++) slideDirs[k + "," + cy] = dir;
              const b = ketchupBottle(dir); b.position.set(dir > 0 ? c - 0.25 : rr + 1.25, cy, 0.7); level.add(b);
            }
          } else if (t === "q") { // string of sausages swinging on a short pendulum from a ceiling beam
            const L = 1.95, py = cy + 2.6;
            level.add(box(1.0, 0.12, KS.steelD, x, py + 0.06, 0.95)); level.add(box(0.06, 6, KS.steelD, x, py + 3.1, 0.94));
            const m = sausageMesh(L); m.position.set(x, py, 1.0); level.add(m);
            sausages.push({ x, py, a: 0, ph: c * 0.37, side: 0, mesh: m });
          } else if (t === "m") { // meat conveyor belt: ridges and meat chunks ride toward the hazard
            if (tile(c - 1, cy) !== "m") {
              let rr = c; while (tile(rr + 1, cy) === "m") rr++;
              const n = rr - c + 1, dir = hazDir(c, rr, cy);
              for (let k = c; k <= rr; k++) beltDirs[k + "," + cy] = dir;
              level.add(box(n, 0.16, KS.belt, c + n / 2, cy + 0.08, 0.06));
              for (let k = 0; k <= n; k++) level.add(circle(0.07, KS.steelD, c + k, cy + 0.08, 0.07));
              const ridges = [], meat = [];
              for (let k = 0; k < n * 3; k++) { const rd = box(0.07, 0.03, KS.beltL, 0, cy + 0.17, 0.07); level.add(rd); ridges.push(rd); }
              for (let k = 0; k < n; k += 2) { const mt = circle(0.13, k % 4 ? KS.meatD : KS.meat, 0, cy + 0.24, 0.08); mt.scale.y = 0.6; level.add(mt); meat.push(mt); }
              belts.push({ l: c, n, dir, ridges, meat, rt: 0 });
            }
          } else if (t === "N") { // bumper car on a 6-tile track between two padded walls
            level.add(box(6, 0.05, MAT.black, x, cy + 0.025, 0.05));
            [-1, 1].forEach((s) => { level.add(box(0.2, 0.6, LP.padD, x + s * 3, cy + 0.3, 0.9)); level.add(box(0.14, 0.52, LP.pad, x + s * 3, cy + 0.3, 0.91)); });
            level.add(box(6, 0.06, LP.chrome, x, cy + 2.95, -0.1)); // ceiling grid the pole rides on
            const dir = c % 2 ? 1 : -1, m = bumperMesh(LP.car[c % 4]); m.scale.x = dir; m.position.set(x, cy, 1.1); level.add(m);
            bumpers.push({ x, bx: x, y: cy, v: dir * 3.2, mesh: m });
          } else if (t === "x") { // jack-in-the-box on the floor
            const m = jackMesh(); m.position.set(x, cy, 0.9); level.add(m);
            jacks.push({ x, y: cy, st: "wait", t: 0, k: 0, dir: 1, mesh: m });
          } else if (t === "i") { // ferris wheel centred over the pit: 4 small cabins on a slow wheel
            const R = 1.8, wy = cy + 2;
            [-1, 1].forEach((s) => { const L = Math.hypot(1.9, 2), leg = box(0.1, L, LP.hub, x + s * 0.95, cy + 1, -0.3); leg.rotation.z = s * Math.atan2(1.9, 2); level.add(leg); });
            const rot = new THREE.Group(); rot.position.set(x, wy, -0.2);
            rot.add(ring(R - 0.05, R + 0.05, LP.rim)); rot.add(ring(R * 0.55 - 0.03, R * 0.55 + 0.03, LP.spoke, 0, 0, 0.005));
            for (let k = 0; k < 8; k++) {
              const a = (k * Math.PI) / 4, sp = box(0.05, R, LP.spoke, (Math.cos(a) * R) / 2, (Math.sin(a) * R) / 2, -0.01); sp.rotation.z = a - Math.PI / 2; rot.add(sp);
              rot.add(circle(0.07, LP.bulb[k % 4], Math.cos(a + 0.39) * R, Math.sin(a + 0.39) * R, 0.01));
            }
            rot.add(circle(0.2, LP.hub, 0, 0, 0.02)); level.add(rot);
            const wh = { x, cy: wy, R, a: c * 0.3, rot, cabs: [] }, rig = c % 4;
            for (let k = 0; k < 4; k++) {
              const m = cabinMesh(LP.cab[k]); level.add(m);
              const cb = { x, y: wy, rig: k === rig, drop: null, fallen: false, vy: 0, mesh: m }; wh.cabs.push(cb); cabins.push(cb);
            }
            wheels.push(wh);
          } else if (t === "l") { // balloon on the floor under a ceiling spike bar that pulls in and out
            const m = balloonMesh(LP.balloon[c % 3]); m.position.set(x, cy, 0.8); level.add(m);
            const tipY = cy + 3.75;
            level.add(box(1.01, 0.18, MAT.spikeDark, x, tipY + 0.42, 0.55)); level.add(box(0.05, 3, MAT.spikeDark, x, tipY + 2, 0.5));
            const spk = new THREE.Group();
            [-0.3, 0, 0.3].forEach((dx) => { const s = tri([dx - 0.14, 0.33, dx + 0.14, 0.33, dx, 0], MAT.spike, 0); s.add(tri([dx, 0.33, dx + 0.14, 0.33, dx, 0], MAT.spikeDark, 0.01)); spk.add(s); });
            spk.position.set(x, tipY, 0.52); level.add(spk);
            balloons.push({ x, y: cy, tipY, popped: false, k: 1, out: true, spk, mesh: m });
          } else if (t === "y") { // coaster rail along the floor with a bright track switch; the cart waits off-screen right
            level.add(box(25, 0.05, LP2.rail, x + 2.5, cy + 0.1, 0.62)); level.add(box(25, 0.04, LP2.rail, x + 2.5, cy + 0.03, 0.62));
            for (let k = -10; k <= 15; k++) level.add(box(0.08, 0.14, LP2.tie, x + k, cy + 0.06, 0.6));
            level.add(box(0.5, 0.1, LP.ink, x, cy + 0.05, 0.9)); level.add(box(0.36, 0.05, LP2.lever, x, cy + 0.11, 0.91));
            const sw = new THREE.Group(); sw.position.set(x, cy + 0.1, 0.92); sw.add(box(0.06, 0.45, LP.chrome, 0, 0.22, 0)); sw.add(circle(0.08, LP.nose, 0, 0.46, 0.01)); sw.rotation.z = 0.5; level.add(sw);
            const m = coasterMesh(); m.visible = false; m.position.set(x + 15, cy + 0.12, 1.15); level.add(m);
            coasters.push({ x, y: cy, st: "wait", t: 0, cx: x + 15, sw, mesh: m });
          } else if (t === "p") { // cotton-candy cloud on the floor, a paper cone stuck in it
            const m = candyMesh(c); m.position.set(x, cy, 2.2); level.add(m);
            if (tile(c - 1, cy) !== "p") { const st = box(0.06, 0.5, LP2.stick, x - 0.3, cy + 0.85, 2.19); st.rotation.z = 0.4; level.add(st); }
            candies.push({ x, y: cy, ph: c * 0.9, mesh: m });
          } else if (t === "M") { // looks like a wall block; a faint mirror frame is the only tell
            const g = new THREE.Group(); g.position.set(x, y, 0);
            g.add(box(1.01, 1.01, (c + r) % 2 ? MAT.dirt : MAT.dirt2));
            if (tile(c, cy + 1) !== "M" && !isGroundChar(tile(c, cy + 1))) g.add(box(1.01, 0.12, MAT.grass, 0, 0.445, 0.01));
            g.add(box(0.03, 0.9, LP2.frame, -0.46, 0, 0.02)); g.add(box(0.03, 0.9, LP2.frame, 0.46, 0, 0.02));
            level.add(g);
          } else if (t === "1") { // looks like an open gap; a glass-clear mirror that glints now and then
            const mat = M(0xe4eef8, { transparent: true, opacity: 0.04 });
            const g = new THREE.Group(); g.position.set(x, y, 0.5);
            g.add(box(1.0, 1.0, mat)); const gl = box(0.06, 1.1, mat, 0, 0, 0.01); gl.rotation.z = -0.5; g.add(gl);
            level.add(g); mirrorPanes.push({ c, cy, ph: c * 1.7 + cy, flash: 0, mat });
          } else if (t === "2") { // shooting-gallery board; fires its darts to the left
            const m = targetMesh(); m.position.set(x, cy, 0.3); level.add(m);
            targets.push({ x, y: cy, t: (c * 0.37) % 2.2, shot: 3, seq: 0, mesh: m });
          } else if (t === "3") { // a pack of 5 rats huddled on the floor
            const rats = [];
            for (let k = 0; k < 5; k++) {
              const m = ratMesh(); m.scale.x = -1; m.position.set(x + k * 0.32 - 0.64, cy, 1.1 + k * 0.01); level.add(m);
              rats.push({ x: x + k * 0.32 - 0.64, y: cy, vx: 0, vy: 0, sp: 5 - k * 0.1, dir: -1, dist: 0, st: "run", ground: true, mesh: m });
            }
            ratPacks.push({ x, y: cy, st: "wait", sq: 0, rats });
          } else if (t === "4") { // manhole cover in a rim on the floor top; steam jet every 2 s
            level.add(box(1.0, 0.05, KN.rim, x, cy + 0.025, 0.5));
            const lid = manholeLid(); lid.position.set(x, cy + 0.02, 0.55); level.add(lid);
            const mat = M(0xe8eef0, { transparent: true, opacity: 0 }), steam = new THREE.Group();
            [[0, 0.5, 0.32], [-0.1, 1.2, 0.36], [0.1, 1.9, 0.4], [0, 2.6, 0.44]].forEach(([dx, dy, r]) => steam.add(circle(r, mat, dx, dy, 0)));
            steam.position.set(x, cy, 0.52); steam.scale.y = 0.01; level.add(steam);
            manholes.push({ x, y: cy, t: (c * 0.37) % 2, lid, steam, mat });
          } else if (t === "6") { // sewage strip lying in a floor dip; neighbouring 6s share one strip
            const mat = M(0x5fae2e, { transparent: true, opacity: 0.85 }), body = box(1.01, 1, mat, x, cy + 0.05, 2.3), top = box(1.01, 0.05, KN.tox, x, cy + 0.1, 2.31);
            body.scale.y = 0.1; level.add(body); level.add(top);
            const prev = sewers[sewers.length - 1];
            if (prev && prev.cy === cy && prev.x1 === c) { prev.x1 = c + 1; prev.parts.push([body, top]); }
            else sewers.push({ x0: c, x1: c + 1, cy, lvl: 0.1, st: "idle", t: 0, parts: [[body, top]] });
          } else if (t === "7") { // pipe hanging from the ceiling; drips every 1.4 s
            const m = pipeMesh(); m.position.set(x, cy + 1, 0.6); level.add(m);
            pipes.push({ x, y: cy + 0.44, t: (c * 0.29) % 1.4, mesh: m });
          } else if (t === "8") { // hydraulic press in a frame; head rests 2.5 up, slams to the floor every 2 s
            const yel = M(0x9a7c16);
            [-0.55, 0.55].forEach((dx) => level.add(box(0.12, 4.6, FB.steelD, x + dx, cy + 2.3, 1.4)));
            level.add(box(1.4, 0.3, FB.steelD, x, cy + 4.6, 1.41));
            for (let k = 0; k < 5; k++) level.add(box(0.2, 0.06, k % 2 ? FB.black : yel, x - 0.4 + k * 0.2, cy + 0.03, 0.5)); // floor stripes
            const head = new THREE.Group();
            head.add(box(0.22, 4.5, FB.steel, 0, 2.7, -0.01)); head.add(box(1.0, 0.45, FB.press, 0, 0.225, 0));
            for (let k = 0; k < 5; k++) head.add(box(0.2, 0.12, k % 2 ? FB.black : yel, -0.4 + k * 0.2, 0.06, 0.01));
            head.position.set(x, cy + 2.5, 2.3); level.add(head);
            presses.push({ x, y: cy, t: (c * 0.37) % 2, head, yel });
          } else if (t === "9") { // welding robot hung from a rail; its torch sweeps sparks across 3 floor tiles
            level.add(box(3.4, 0.12, FB.steelD, x, cy + 4.1, 1.4)); level.add(box(0.5, 0.7, FB.black, x, cy + 3.7, 1.42));
            level.add(box(3, 0.04, FB.scorch, x, cy + 0.02, 0.5));
            const arm = new THREE.Group();
            arm.add(box(0.2, 1.4, FB.robot, 0, -0.7, 0)); arm.add(circle(0.16, FB.black, 0, -1.4, 0.01));
            arm.add(box(0.14, 1.3, FB.robot, 0, -2.05, 0)); arm.add(box(0.24, 0.22, FB.steelD, 0, -2.66, 0.01)); arm.add(circle(0.18, FB.black, 0, 0, 0.01));
            arm.position.set(x, cy + 3.3, 1.5); level.add(arm);
            const beam = box(0.1, 1, FB.spark), glow = circle(0.22, FB.glow), sparks = [0, 1, 2, 3].map(() => circle(0.04, FB.spark));
            level.add(beam); level.add(glow); sparks.forEach((s) => level.add(s));
            welders.push({ x, y: cy, py: cy + 3.3, t: (c * 0.29) % 1.8, cr: 0, arm, beam, glow, sparks });
          } else if (t === "0") { // big gear standing in a pit on an axle post; turns clockwise
            const R = 0.95, g = new THREE.Group();
            for (let k = 0; k < 12; k++) { const a = (k * Math.PI) / 6, tt = box(0.26, 0.26, FB.gearD, Math.sin(a) * (R + 0.04), Math.cos(a) * (R + 0.04), -0.01); tt.rotation.z = -a; g.add(tt); }
            g.add(circle(R, FB.gear)); g.add(circle(R * 0.72, FB.gearD, 0, 0, 0.01)); g.add(circle(R * 0.6, FB.gear, 0, 0, 0.02));
            for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 2; g.add(circle(0.13, FB.black, Math.cos(a) * 0.38, Math.sin(a) * 0.38, 0.03)); }
            g.add(circle(0.16, FB.steel, 0, 0, 0.04)); g.add(box(0.4, 0.06, FB.black, 0, 0, 0.05));
            level.add(box(0.2, 2, FB.steelD, x, cy - 0.85, 1.4));
            g.position.set(x, cy + 0.15, 1.5); level.add(g);
            gears.push({ x, y: cy + 0.15, R, mesh: g });
          } else if (t === "!") { // laser doorway: steel frame, a low and a high beam that take turns
            [-0.68, 0.68].forEach((dx) => {
              level.add(box(0.16, 1.7, FB.steelD, x + dx, cy + 0.85, 1.4));
              [0.22, 1.15].forEach((hy) => level.add(box(0.2, 0.12, FB.black, x + dx, cy + hy, 1.42)));
            });
            level.add(box(1.52, 0.16, FB.steelD, x, cy + 1.74, 1.4)); level.add(circle(0.07, FB.glow, x, cy + 1.74, 1.43));
            const beams = [0.22, 1.15].map((hy) => {
              const core = M(0xff3a3a, { transparent: true, opacity: 0.9 }), glowM = M(0xff1a1a, { transparent: true, opacity: 0.25 });
              const g = new THREE.Group(); g.add(box(1.2, 0.18, glowM)); g.add(box(1.2, 0.05, core, 0, 0, 0.01));
              g.position.set(x, cy + hy, 2.3); level.add(g);
              return { g, core, glowM };
            });
            lasers.push({ x, y: cy, t: 0, beams });
          } else if (t === "$") { // ceiling crane: rail, trolley, cable and a hanging crate
            level.add(box(5.8, 0.12, FB.steelD, x, cy + 4.35, 1.4));
            const trolley = new THREE.Group();
            trolley.add(box(0.7, 0.28, FB.robot, 0, 0, 0)); [-0.22, 0.22].forEach((dx) => trolley.add(circle(0.08, FB.black, dx, 0.12, 0.01)));
            trolley.position.set(x, cy + 4.15, 1.45); level.add(trolley);
            const cable = box(0.04, 1, FB.black); level.add(cable);
            const crate = new THREE.Group();
            crate.add(box(0.96, 0.96, FB.crate)); crate.add(box(0.96, 0.1, FB.crateD, 0, 0.36, 0.01)); crate.add(box(0.96, 0.1, FB.crateD, 0, -0.36, 0.01));
            const xb = box(1.2, 0.09, FB.crateD, 0, 0, 0.02); xb.rotation.z = 0.78; crate.add(xb);
            level.add(crate);
            cranes.push({ x, y: cy, tx: x, cyc: cy + 2.8, dir: 1, st: "move", t: 0, vy: 0, sx: x, ex: x, trolley, cable, crate });
          } else if (t === "(") { // sewer fan: a dark vent in the wall at foot height, a 3-blade fan turning in it
            level.add(box(0.9, 0.8, XT.vent, x, cy + 0.4, 0.3)); level.add(box(0.76, 0.68, XT.ventD, x, cy + 0.38, 0.31));
            [-0.43, 0.43].forEach((dx) => level.add(box(0.08, 0.8, XT.iron, x + dx, cy + 0.4, 1.4)));
            level.add(box(0.94, 0.08, XT.iron, x, cy + 0.8, 1.4));
            const bl = new THREE.Group();
            for (let k = 0; k < 3; k++) { const arm = new THREE.Group(); arm.add(box(0.13, 0.3, XT.blade, 0, 0.16, 0)); arm.rotation.z = k * 2.094; bl.add(arm); }
            bl.add(circle(0.07, XT.iron, 0, 0, 0.01));
            bl.position.set(x, cy + 0.36, 1.3); level.add(bl);
            fanBlades.push({ x, y: cy, t: (c * 0.31) % 2.5, wr: 0, bl });
          } else if (t === ")") { // rat king: one fat crowned rat waiting on the floor, facing left
            const m = ratMesh(); m.scale.set(-2.2, 2.2, 1);
            const cr = new THREE.Group(); cr.add(box(0.13, 0.035, XT.gold));
            [-0.045, 0, 0.045].forEach((dx) => cr.add(tri([dx - 0.025, 0.015, dx + 0.025, 0.015, dx, 0.075], XT.gold, 0)));
            cr.position.set(0.14, 0.24, 0.03); m.add(cr);
            m.position.set(x, cy, 1.15); level.add(m);
            ratKings.push({ x, hx: x, y: cy, hy: 0, st: "wait", t: 0, n: 0, dir: -1, back: false, sx: x, ex: x, dur: 0.45, mesh: m });
          } else if (t === "*") { // ceiling grinder on a rail; its sparks shower this tile and the next
            const gx = x + 0.5;
            level.add(box(2.6, 0.12, FB.steelD, gx, cy + 4.1, 1.4)); level.add(box(0.14, 0.5, FB.steelD, gx, cy + 3.8, 1.41));
            level.add(box(2, 0.04, FB.scorch, gx, cy + 0.02, 0.5));
            const head = new THREE.Group(); head.add(box(0.7, 0.3, FB.robot)); head.add(box(0.22, 0.1, FB.black, 0.2, 0.08, 0.01));
            const disc = new THREE.Group(); disc.add(circle(0.3, FB.steel)); disc.add(box(0.5, 0.06, FB.steelD, 0, 0, 0.01)); disc.position.set(0, -0.3, 0.02); head.add(disc);
            head.position.set(gx, cy + 3.5, 1.5); level.add(head);
            const glow = circle(0.3, FB.glow); glow.position.set(gx, cy + 3.2, 2.31); glow.visible = false; level.add(glow);
            const sp = [];
            for (let k = 0; k < 18; k++) { const m = box(0.04, 0.2, FB.spark); m.visible = false; level.add(m); sp.push({ m, ph: k / 18, dx: (((k * 7) % 18) / 17) * 1.8 - 0.9 }); }
            sparkers.push({ x: gx, y: cy, t: (c * 0.23) % 2.4, cr: 0, disc, glow, sp });
          } else if (t === "/") { // steel ramp rising to the right with a stack of barrels on top; they roll off its low end
            level.add(tri([x - 0.5, cy, x + 1.5, cy, x + 1.5, cy + 1.3], XT.ramp, 0.4));
            const lip = box(2.4, 0.06, XT.rampL, x + 0.5, cy + 0.66, 0.41); lip.rotation.z = Math.atan2(1.3, 2); level.add(lip);
            [[1.25, 1.6], [1.25, 2.15]].forEach(([dx, dy]) => { level.add(circle(0.28, XT.barrel, x + dx, cy + dy, 0.42)); level.add(box(0.56, 0.06, XT.band, x + dx, cy + dy, 0.43)); });
            ramps.push({ x, y: cy, t: (c * 0.3) % 2.5, list: [] });
          } else if (t === "%") { // icicle hanging from the ceiling block above; origin at its root
            const g = new THREE.Group();
            g.add(tri([-0.2, 0, 0.2, 0, 0, -0.85], BZ.ice, 0)); g.add(tri([0, 0, 0.2, 0, 0, -0.85], BZ.iceD, 0.01));
            g.add(tri([-0.12, -0.05, -0.04, -0.05, -0.08, -0.5], BZ.iceL, 0.02));
            g.position.set(x, cy + 1, 2.2); level.add(g);
            icicles.push({ x, y: cy + 1, vy: 0, st: "idle", t: 0, mesh: g });
          } else if (t === "&") { // ice floor: a pale glaze on the floor top with a few shine streaks
            level.add(box(1.01, 0.06, BZ.floor, x, cy + 0.03, 0.05));
            const s = box(0.3, 0.015, BZ.shine, x - 0.2 + ((c * 7) % 3) * 0.15, cy + 0.045, 0.06); s.rotation.z = 0.15; level.add(s);
          } else if (t === "@") { // snowball: unit circle, scaled to its radius as it grows
            const g = new THREE.Group();
            g.add(circle(1, BZ.snow)); g.add(circle(0.55, BZ.snowD, 0.3, -0.35, 0.01)); g.add(circle(0.18, BZ.snowD, -0.45, 0.3, 0.01));
            g.add(circle(0.12, BZ.snowD, 0.1, 0.55, 0.01));
            snowballs.push({ x, y: cy, vx: 0, vy: 0, r: 0.25, dist: 0, st: "wait", dir: -1, mesh: g }); level.add(g);
            g.scale.setScalar(0.25); g.position.set(x, cy + 0.25, 1.9);
          } else if (t === "+") { // freezer fan on a stand; blows toward the nearest hazard (left first)
            let d = 0;
            for (let k = 1; k <= 6 && !d; k++) if (isHaz(c - k, cy)) d = -1;
            for (let k = 1; k <= 6 && !d; k++) if (isHaz(c + k, cy)) d = 1;
            d = d || -1;
            level.add(box(0.1, 0.6, BZ.frameD, x, cy + 0.3, 0.2)); level.add(box(0.6, 0.08, BZ.frameD, x, cy + 0.04, 0.2));
            level.add(box(1.4, 1.4, BZ.frame, x, cy + 1.2, 0.2)); level.add(circle(0.6, BZ.frameD, x, cy + 1.2, 0.21));
            const blades = new THREE.Group();
            for (let k = 0; k < 4; k++) { const b = box(0.2, 0.55, BZ.blade, 0, 0.3, 0); const h = new THREE.Group(); h.add(b); h.rotation.z = (k * Math.PI) / 2; blades.add(h); }
            blades.add(circle(0.1, BZ.frame, 0, 0, 0.01)); blades.position.set(x, cy + 1.2, 0.22); level.add(blades);
            for (let k = -2; k <= 2; k++) level.add(box(1.2, 0.03, BZ.frame, x, cy + 1.2 + k * 0.22, 0.24)); // grille
            level.add(box(0.12, 1.2, BZ.iceL, x + d * 0.72, cy + 1.2, 0.23)); // frosted outlet side
            fans.push({ x, y: cy, d, t: (c * 0.53) % 3, tell: false, spin: 0, blades });
          } else if (t === ";") { // ice bridge slab over water; cracks show once it starts to give
            const g = new THREE.Group(); g.position.set(x, y, 0.1);
            g.add(box(1.01, 0.34, BZ.ice, 0, 0.33, 0)); g.add(box(1.01, 0.08, BZ.iceD, 0, 0.12, 0.01));
            g.add(box(0.3, 0.03, BZ.iceL, -0.2 + ((c * 7) % 3) * 0.15, 0.44, 0.02));
            const cracks = new THREE.Group(); cracks.visible = false; g.add(cracks);
            [[-0.25, 0.32, 0.8, 0.45], [0.1, 0.3, -0.7, 0.5], [0.3, 0.36, 0.4, 0.3], [-0.05, 0.22, 1.3, 0.25]].forEach(([a, b, rz, l]) => { const k = box(l, 0.035, BZ.crack, a, b, 0.03); k.rotation.z = rz; cracks.add(k); });
            level.add(g);
            fakes[c + "," + cy] = { mesh: g, timer: -1, fallen: false, vy: 0, delay: 0.4, ice: true, cracks, y0: y };
          } else if (t === ":") { // ice press: frame posts and header, two ice blocks parked either side of the gap
            [-1.95, 1.95].forEach((dx) => level.add(box(0.12, 2.1, BZ.frameD, x + dx, cy + 1.05, 0.2)));
            level.add(box(4.02, 0.2, BZ.frameD, x, cy + 2.1, 0.25));
            const blk = () => { const g = new THREE.Group(); g.add(box(1, 1.9, BZ.ice, 0, 0.95, 0)); g.add(box(0.14, 1.7, BZ.iceL, -0.3, 0.95, 0.01)); g.add(box(1, 0.1, BZ.iceD, 0, 0.05, 0.01)); level.add(g); return g; };
            const L = blk(), Rb = blk(); L.position.set(x - 1.45, cy, 0.3); Rb.position.set(x + 1.45, cy, 0.3);
            icePresses.push({ x, y: cy, t: (c * 0.37) % 2.2, k: 0, tell: false, L, R: Rb });
          } else if (t === "<") { // metro track: the first tile of a run lays the rails and builds its train, tunnel posts and headlight glow
            if (tile(c - 1, cy) !== "<") {
              let e = c; while (tile(e + 1, cy) === "<") e++;
              const x0 = c, x1 = e + 1, rails = new THREE.Group();
              for (let k = x0; k < x1; k++) [0.25, 0.75].forEach((d) => rails.add(box(0.16, 0.06, MT.sleeper, k + d, cy + 0.03, 0.3)));
              rails.add(box(x1 - x0, 0.07, MT.rail, (x0 + x1) / 2, cy + 0.09, 0.32)); rails.add(box(x1 - x0, 0.02, MT.railL, (x0 + x1) / 2, cy + 0.125, 0.33));
              level.add(rails);
              [x0, x1].forEach((px) => level.add(box(0.3, 2.3, MT.nose, px, cy + 1.15, 1.6))); // tunnel posts hide the train's ends
              const g = new THREE.Group(), segs = [];
              for (let k = 0; k < 12; k++) { // 6 tiles long, in half-tile segments so it can be clipped to the track
                const s = new THREE.Group(); s.position.x = 0.25 + k * 0.5;
                s.add(box(0.51, 1.8, k === 0 ? MT.nose : MT.body, 0, 1.0, 0)); s.add(box(0.51, 0.12, MT.stripe, 0, 0.72, 0.01));
                if (k === 0) { s.add(box(0.36, 0.45, MT.win, 0.03, 1.35, 0.01)); s.add(circle(0.08, MT.light, -0.1, 0.45, 0.02)); }
                else if (k % 4 === 1 || k % 4 === 2) s.add(box(0.4, 0.5, MT.winL, 0, 1.35, 0.01));
                else s.add(box(0.03, 1.5, MT.bodyD, 0.24, 0.9, 0.01));
                if (k % 3 === 1) s.add(circle(0.1, MT.nose, 0, 0.1, 0.02));
                g.add(s); segs.push(s);
              }
              g.position.set(x1, cy, 1.2); g.visible = false; level.add(g);
              const gm = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, opacity: 0 });
              gm.color.setRGB(1, 0.9, 0.55); level.add(box(3, 3, gm, x1 + 0.3, cy + 0.6, 1.7));
              trains.push({ x0, x1, y: cy, t: 1 + ((c * 0.61) % 2), mesh: g, segs, glow: gm, rails, rt: 0 });
            }
          } else if (t === ",") { // third rail: yellow-covered live rail on white insulators along the floor
            [-0.3, 0.3].forEach((d) => level.add(box(0.12, 0.1, MT.ins, x + d, cy + 0.05, 0.35)));
            level.add(box(1.01, 0.12, MT.third, x, cy + 0.15, 0.36)); level.add(box(1.01, 0.03, MT.thirdD, x, cy + 0.2, 0.37));
            const gm = M(0x8fd0ff, { transparent: true, opacity: 0 }); level.add(box(1.01, 0.3, gm, x, cy + 0.15, 0.38));
            thirdRails.push({ x, y: cy, gm, t: rnd(0.2, 1.8) });
          } else if (t === ">") { // metro car: body behind, two sliding doors in front, a status lamp above
            level.add(box(4, 2.9, MT.body, x, cy + 1.45, 0.1)); level.add(box(4, 0.14, MT.stripe, x, cy + 1.0, 0.11));
            [-1.35, 1.35].forEach((d) => level.add(box(0.7, 0.6, MT.win, x + d, cy + 1.8, 0.11)));
            level.add(box(1, 2.9, MT.win, x, cy + 1.45, 0.12)); // dark doorway
            const pnl = () => { const g = new THREE.Group(); g.add(box(0.5, 2.9, MT.door, 0, 1.45, 0)); g.add(box(0.3, 0.8, MT.doorW, 0, 1.9, 0.01)); g.add(box(0.5, 0.05, MT.nose, 0, 0.03, 0.01)); level.add(g); return g; };
            const L = pnl(), Rd = pnl(); L.position.set(x - 0.75, cy, 0.3); Rd.position.set(x + 0.75, cy, 0.3);
            const lamp = M(0x2a8a3a); level.add(circle(0.09, lamp, x, cy + 2.7, 0.35));
            mdoors.push({ x, y: cy, t: (c * 0.41) % 3, k: 0, tell: false, L, R: Rd, lamp });
          } else if (t === "[") { // escalator run: steel steps riding toward the hazard, with a black handrail (moves her like the belt)
            if (tile(c - 1, cy) !== "[") {
              let rr = c; while (tile(rr + 1, cy) === "[") rr++;
              const n = rr - c + 1, dir = hazDir(c, rr, cy);
              for (let k = c; k <= rr; k++) beltDirs[k + "," + cy] = dir;
              level.add(box(n, 0.18, MT.bodyD, c + n / 2, cy + 0.09, 0.06));
              level.add(box(n, 0.08, MT.nose, c + n / 2, cy + 1.0, 0.4)); // handrail
              [c + 0.1, rr + 0.9].forEach((px) => level.add(box(0.08, 1.0, MT.nose, px, cy + 0.5, 0.39)));
              const steps = [];
              for (let k = 0; k < n * 2; k++) { const s = box(0.06, 0.05, MT.railL, 0, cy + 0.2, 0.07); level.add(s); steps.push(s); }
              escalators.push({ l: c, n, dir, steps, rt: 0 });
            }
          } else if (t === "{") { // ticket turnstile: gate box with a three-bar arm at waist height
            level.add(box(0.36, 1.0, MT.bodyD, x, cy + 0.5, 0.3)); level.add(box(0.36, 0.08, MT.stripe, x, cy + 0.95, 0.31));
            const arm = new THREE.Group(); arm.position.set(x, cy + 0.85, 0.9);
            for (let k = 0; k < 3; k++) { const b = box(0.55, 0.07, MT.railL, 0.275, 0, 0); const g = new THREE.Group(); g.rotation.z = (k * Math.PI * 2) / 3; g.add(b); arm.add(g); }
            arm.add(circle(0.09, MT.nose, 0, 0, 0.01)); level.add(arm);
            const lamp = M(0x2a8a3a); level.add(circle(0.06, lamp, x, cy + 1.08, 0.35));
            turnstiles.push({ x, y: cy, t: (c * 0.37) % 1.5, arm, lamp, tell: false, spin: false });
          } else if (t === "?") { // broken live cable hanging from a ceiling bracket, copper end sparking
            const L = 2.2, py = cy + 2.8;
            level.add(box(0.9, 0.12, MT.nose, x, py + 0.06, 0.95)); level.add(box(0.06, 6, MT.nose, x, py + 3.1, 0.94));
            const g = new THREE.Group(); g.add(box(0.06, L, MT.nose, 0, -L / 2, 0)); g.add(box(0.1, 0.14, MT.third, 0, -L - 0.03, 0.01));
            const gm = M(0x8fd0ff, { transparent: true, opacity: 0.3 }); g.add(circle(0.16, gm, 0, -L - 0.05, 0.02));
            g.position.set(x, py, 1.0); level.add(g);
            cables.push({ x, py, L, a: 0, ph: c * 0.29, side: 0, mesh: g, gm, st: 0 });
          } else if (t === "]") { // stage spotlight on a short chain under a rigging truss, its beam lighting the floor
            const hy = cy + 4.2;
            level.add(box(1.8, 0.18, ST.truss, x, hy + 0.86, 0.9)); level.add(box(1.8, 0.04, ST.trussL, x, hy + 0.95, 0.91));
            [-0.6, 0, 0.6].forEach((d) => { const b = box(0.04, 0.3, ST.trussL, x + d, hy + 0.86, 0.92); b.rotation.z = 0.6; level.add(b); });
            const g = new THREE.Group(), lm = M(0xfff2b0);
            g.add(box(0.05, 0.5, ST.chain, 0, 0.56, 0));
            g.add(box(0.72, 0.5, ST.lamp, 0, 0.05, 0.01)); g.add(box(0.72, 0.07, ST.lampL, 0, 0.27, 0.02));
            g.add(box(0.5, 0.08, ST.lampL, 0, -0.22, 0.02)); g.add(circle(0.15, lm, 0, -0.18, 0.03));
            g.position.set(x, hy, 1.0); level.add(g);
            const cm = new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.1, depthWrite: false });
            const cone = tri([x - 0.22, hy - 0.2, x + 0.22, hy - 0.2, x + 0.85, cy, x - 0.85, cy], cm, 0.15); level.add(cone);
            spots.push({ x, y: cy, py: hy, st: "wait", t: 0, vy: 0, mesh: g, lm, cm, cone, rt: 0 });
          } else if (t === "}") { // marionette hands: a control bar above, two wooden hands on strings, a shadow on the floor
            level.add(box(4.2, 0.14, ST.plankD, x, cy + 5.3, 0.9)); level.add(box(0.14, 0.9, ST.plankD, x, cy + 5.3, 0.91));
            const sm = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12, depthWrite: false });
            const shadow = circle(1, sm, x, cy + 0.04, 0.2); shadow.scale.set(1.1, 0.1, 1); level.add(shadow);
            const hand = (s) => { // s = -1 left hand, 1 right hand; thumb points inward
              const g = new THREE.Group();
              g.add(box(0.56, 0.26, ST.cuff, 0, 0.13, 0)); g.add(box(0.8, 1.0, MAT.wood, 0, 0.76, 0.01)); g.add(box(0.12, 0.9, MAT.woodL, s * 0.24, 0.78, 0.02));
              [-0.3, -0.1, 0.1, 0.3].forEach((d, k) => { const fh = 0.5 + (k === 1 || k === 2 ? 0.1 : 0); g.add(box(0.17, fh, MAT.wood, d, 1.26 + fh / 2, 0.01)); g.add(circle(0.085, MAT.wood, d, 1.26 + fh, 0.01)); });
              const th = box(0.18, 0.5, MAT.wood, -s * 0.5, 0.82, 0.015); th.rotation.z = -s * 0.7; g.add(th);
              [1.0, 0.6].forEach((yy) => g.add(box(0.5, 0.02, MAT.woodD, 0, yy, 0.03)));
              level.add(g);
              const str = box(0.025, 1, ST.string, 0, 0, 0.85); level.add(str);
              return { g, str };
            };
            puppetHands.push({ x, y: cy, t: (c * 0.47) % 2.4, k: 0, tell: false, shut: false, L: hand(-1), R: hand(1), sm, shadow });
          } else if (t === "'") { // stage trapdoor: a run of them is one door, two plank leaves over a dark pit, an ALKIŞ sign above
            if (tile(c - 1, cy) !== "'") {
              let e = c; while (tile(e + 1, cy) === "'") e++;
              const n = e - c + 1, mx = c + n / 2;
              level.add(box(n, 10, MAT.black, mx, cy + 1 - 5, -0.02));
              const leaf = (s) => {
                const pv = new THREE.Group(); pv.position.set(s < 0 ? c : e + 1, cy + 1, 0.05);
                pv.add(box(n / 2, 0.22, ST.plank, -s * n / 4, -0.11, 0)); pv.add(box(n / 2, 0.05, ST.edge, -s * n / 4, -0.02, 0.01));
                for (let k = 1; k < n; k++) pv.add(box(0.03, 0.22, ST.plankD, -s * k * 0.5, -0.11, 0.01));
                level.add(pv); return pv;
              };
              const L = leaf(-1), Rl = leaf(1);
              const signM = new THREE.MeshBasicMaterial({ map: alkisTex, transparent: true }); signM.color.setScalar(0.22);
              level.add(box(0.03, 1.6, ST.chain, mx - 0.7, cy + 5.4, 0.89)); level.add(box(0.03, 1.6, ST.chain, mx + 0.7, cy + 5.4, 0.89));
              level.add(box(1.9, 0.6, signM, mx, cy + 4.4, 0.9));
              const gm = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, opacity: 0 });
              gm.color.setRGB(1, 0.8, 0.45); level.add(box(3.4, 2, gm, mx, cy + 4.4, 0.88));
              const d = { c, e, x: mx, y: cy, t: (c * 0.53) % 3, open: false, k: 0, tell: false, L, R: Rl, signM, gm, rt: 0 };
              for (let k = c; k <= e; k++) stageOpen[k + "," + cy] = d;
              tdoors.push(d);
            }
          } else if (t === "ç") { // camera crane: a dolly and column behind, a long boom swinging a film camera through head height
            const py = cy + 3.8, L = 3.0;
            level.add(box(1.2, 0.2, ST.truss, x, cy + 0.24, 0.84));
            level.add(circle(0.14, MAT.black, x - 0.42, cy + 0.14, 0.85)); level.add(circle(0.14, MAT.black, x + 0.42, cy + 0.14, 0.85));
            level.add(box(0.16, py - cy - 0.3, ST.trussL, x, cy + (py - cy) / 2 + 0.15, 0.83));
            level.add(box(0.46, 0.3, ST.lamp, x, py, 0.95));
            const g = new THREE.Group();
            g.add(box(0.1, L + 0.9, ST.truss, 0, -L / 2 + 0.45, 0)); g.add(box(0.42, 0.34, ST.lampL, 0, 0.8, 0.01)); // boom and counterweight
            const cam = new THREE.Group(); cam.position.set(0, -L, 0.02);
            cam.add(box(0.7, 0.42, ST.lamp, 0, 0, 0)); cam.add(box(0.3, 0.26, ST.lampL, -0.48, 0, 0.01)); cam.add(circle(0.1, ST.glass, -0.63, 0, 0.02));
            [-0.12, 0.24].forEach((d) => { cam.add(circle(0.2, ST.lamp, d, 0.38, 0.01)); cam.add(circle(0.07, ST.trussL, d, 0.38, 0.02)); });
            cam.add(circle(0.045, M(0xff3a2a), 0.24, 0.08, 0.02));
            g.add(cam); g.position.set(x, py, 1.0); level.add(g);
            camCranes.push({ x, py, L, ph: (c * 0.31) % 2, side: 0, mesh: g, cam });
          } else if (t === "ş") { // confetti cannon on a wheel, lit fuse at the back; turns to face her between shots
            const g = new THREE.Group(); g.position.set(x, cy, 0.4);
            g.add(box(0.95, 0.4, CF.barrel, 0, 0.55, 0)); g.add(box(0.12, 0.5, CF.barrelL, -0.5, 0.55, 0.01));
            [-0.15, 0.15].forEach((d) => g.add(box(0.06, 0.4, CF.barrelL, d, 0.55, 0.01)));
            g.add(circle(0.25, MAT.wood, 0.05, 0.25, 0.02)); g.add(circle(0.08, MAT.woodD, 0.05, 0.25, 0.03));
            g.add(box(0.04, 0.22, ST.string, 0.46, 0.84, 0));
            const fm = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, opacity: 0 });
            fm.color.setRGB(1, 0.7, 0.3); g.add(box(0.6, 0.6, fm, 0.46, 0.96, 0.05));
            level.add(g);
            cannons.push({ x, y: cy, t: (c * 0.41) % 2, g, fm, dir: -1, kick: 0, rt: 0 });
          } else if (t === "ğ") { // fake exit: a grey door under a glowing ÇIKIŞ sign, a boxing glove hidden behind it
            level.add(box(1.1, 2.0, ST.trussL, x, cy + 1.0, 0.3)); level.add(box(0.9, 1.9, CF.door, x, cy + 0.95, 0.32));
            level.add(box(0.7, 0.6, CF.doorD, x, cy + 1.35, 0.33)); level.add(box(0.7, 0.06, MAT.black, x, cy + 0.85, 0.33));
            level.add(circle(0.06, CF.gold, x + 0.3, cy + 0.85, 0.34));
            const sm = new THREE.MeshBasicMaterial({ map: cikisTex, transparent: true });
            level.add(box(1.3, 0.48, sm, x, cy + 2.45, 0.35));
            const gm = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, opacity: 0.35 });
            gm.color.setRGB(0.3, 1, 0.5); level.add(box(2.6, 1.6, gm, x, cy + 2.45, 0.34));
            const glove = new THREE.Group();
            glove.add(box(0.2, 0.3, CF.gloveD, -0.24, 0, 0)); glove.add(circle(0.25, CF.glove, 0, 0, 0.01)); glove.add(circle(0.11, CF.glove, -0.05, 0.22, 0.02));
            glove.add(box(0.05, 0.3, CF.gloveD, 0.12, 0, 0.02));
            const arm = box(1, 0.1, CF.barrelL, 0, 0, 0); level.add(arm); level.add(glove);
            const d = { x, y: cy, k: 0, dir: -1, hit: false, glove, arm, gm };
            fdoors.push(d); placeGlove(d);
          } else if (t === "ö") { // rotating stage: a run of them is one segment, red velvet with gold rims on both faces, over a dark pit
            if (tile(c - 1, cy) !== "ö") {
              let e = c; while (tile(e + 1, cy) === "ö") e++;
              const n = e - c + 1, mx = c + n / 2;
              level.add(box(n, 10, MAT.black, mx, cy + 1 - 5, -0.02));
              const g = new THREE.Group(); g.position.set(mx, cy + 0.85, 0.05);
              g.add(box(n, 0.3, CF.velvet, 0, 0, 0)); g.add(box(n, 0.05, CF.gold, 0, 0.13, 0.01)); g.add(box(n, 0.05, CF.gold, 0, -0.13, 0.01));
              for (let k = 1; k < n; k++) g.add(box(0.03, 0.2, ST.plankD, -n / 2 + k, 0, 0.01));
              g.add(circle(0.11, CF.gold, 0, 0, 0.02));
              level.add(g);
              const d = { c, e, x: mx, y: cy, t: (c * 0.37) % 2.5, open: false, rt: 0, g };
              for (let k = c; k <= e; k++) stageOpen[k + "," + cy] = d;
              turns.push(d);
            }
          } else if (t === "ü") { // old boiler: riveted tank on legs, pressure gauge, whistle on top, a steam jet that vents sideways
            const g = new THREE.Group(); g.position.set(x, cy, 0.4);
            [-0.3, 0.3].forEach((d) => g.add(box(0.08, 0.26, BD.iron, d, 0.13, 0)));
            g.add(box(0.8, 1.05, BD.tank, 0, 0.78, 0.01)); g.add(circle(0.4, BD.tank, 0, 1.3, 0)); g.add(box(0.14, 0.9, BD.tankD, 0.26, 0.78, 0.015));
            [0.36, 1.18].forEach((h) => g.add(box(0.82, 0.05, BD.band, 0, h, 0.02)));
            [-0.3, -0.1, 0.1, 0.3].forEach((d) => g.add(circle(0.025, BD.band, d, 0.3, 0.025)));
            g.add(circle(0.15, BD.band, 0, 0.84, 0.025)); g.add(circle(0.12, BD.gauge, 0, 0.84, 0.03));
            const needle = box(0.022, 0.2, M(0xc4302b), 0, 0.84, 0.035); g.add(needle);
            [-1, 1].forEach((d) => g.add(box(0.2, 0.12, BD.iron, d * 0.48, 0.45, 0.02)));
            g.add(box(0.1, 0.3, BD.brass, 0, 1.82, 0)); g.add(box(0.2, 0.06, BD.brass, 0, 1.96, 0.01));
            g.add(circle(0.1, MAT.fire, 0, 0.42, 0.03));
            level.add(g);
            const sm = M(0xf4f6f8, { transparent: true, opacity: 0 }), jet = new THREE.Group();
            [0.7, 1.3, 1.9, 2.5, 3.05].forEach((d, k) => jet.add(circle(0.2 + k * 0.05, sm, d, 0, k * 0.001)));
            jet.position.set(x, cy + 0.45, 1.1); jet.visible = false; level.add(jet);
            boilers.push({ x, y: cy, t: (c * 0.43) % 3, g, jet, sm, needle, dir: -1, wh: false, on: false });
          } else if (t === "Ç") { // heavy pantry shelf against the wall with rows of jars; tips over its bottom corner
            const g = new THREE.Group();
            g.add(box(0.9, 2.2, BD.shelf, 0, 1.1, 0)); g.add(box(0.76, 2.06, BD.shelfD, 0, 1.1, 0.005));
            [0.1, 0.75, 1.4, 2.05].forEach((h) => g.add(box(0.86, 0.07, BD.shelf, 0, h, 0.01)));
            [0.14, 0.79, 1.44].forEach((h, r) => [-0.24, 0, 0.24].forEach((d, k) => {
              g.add(box(0.17, 0.3, JARS[(r + k) % 3], d, h + 0.19, 0.02)); g.add(box(0.19, 0.06, BD.brass, d, h + 0.36, 0.025));
            }));
            g.position.set(x, cy, 0.3); level.add(g);
            shelves.push({ x, y: cy, st: "wait", t: 0, a: 0, w: 0, dir: 1, g, rt: 0 });
          } else if (t === "Ş") { // giant mousetrap: wooden board, cocked steel bar, a wedge of cheese on the bait plate
            const g = new THREE.Group(); g.position.set(x, cy, 0.45);
            g.add(box(1.3, 0.14, MAT.wood, 0, 0.07, 0)); g.add(box(1.3, 0.04, MAT.woodL, 0, 0.13, 0.01));
            g.add(circle(0.08, BD.iron, 0, 0.2, 0.02));
            const ch = tri([0.12, 0.15, 0.58, 0.15, 0.12, 0.46], BD.cheese, 0.02); g.add(ch);
            [[0.22, 0.22], [0.3, 0.31], [0.4, 0.2]].forEach(([a, b]) => g.add(circle(0.035, BD.cheeseD, a, b, 0.025)));
            const bar = new THREE.Group(); bar.position.set(0, 0.2, 0.03);
            bar.add(box(0.6, 0.05, BD.steel, -0.3, 0, 0)); bar.add(box(0.05, 0.12, BD.steel, -0.6, 0.04, 0));
            g.add(bar); level.add(g);
            mtraps.push({ x, y: cy, shut: false, bar });
          } else if (t === "Ğ") { // bare bulb on a frayed cord from a ceiling hook, swinging low and sparking
            const L = 2.0, py = cy + 2.8;
            level.add(box(0.5, 0.1, BD.iron, x, py + 0.05, 0.95)); level.add(box(0.04, 6, MAT.cord, x, py + 3.1, 0.94));
            const g = new THREE.Group(); g.add(box(0.035, L, MAT.cord, 0, -L / 2, 0)); g.add(box(0.13, 0.13, BD.brass, 0, -L - 0.03, 0.01));
            const gm = M(0xffe39a, { transparent: true, opacity: 0.25 }); g.add(circle(0.45, gm, 0, -L - 0.24, 0.005));
            const lm = M(0xfff0b0); g.add(circle(0.17, lm, 0, -L - 0.24, 0.01));
            g.position.set(x, py, 1.0); level.add(g);
            swingBulbs.push({ x, py, L: L + 0.24, ph: c * 0.37, side: 0, mesh: g, gm, lm, st: 0 });
          } else if (t === "Ö") { // cartoon spider on a silk thread from high above, big googly eyes, eight wiggly legs
            const top = cy + 3.3, anchor = cy + 9;
            const thread = box(0.025, 1, BD.web, x, 0, 0.88); level.add(thread);
            const g = new THREE.Group(), legs = [];
            for (let k = 0; k < 8; k++) {
              const side = k < 4 ? -1 : 1, i = k % 4, leg = new THREE.Group();
              leg.add(box(0.34, 0.035, BD.spiderL, side * 0.17, 0, 0)); leg.add(box(0.035, 0.16, BD.spiderL, side * 0.33, -0.07, 0));
              leg.position.set(side * 0.12, 0.06 - i * 0.06, -0.01); leg.rotation.z = side * (0.5 - i * 0.3); g.add(leg); legs.push({ leg, side, base: leg.rotation.z, i });
            }
            g.add(circle(0.24, BD.spider, 0, 0.04, 0)); g.add(circle(0.16, BD.spider, 0, -0.2, 0.005));
            [-1, 1].forEach((d) => { g.add(circle(0.065, BD.eye, d * 0.065, -0.18, 0.01)); g.add(circle(0.03, BD.pupil, d * 0.065, -0.2, 0.015)); });
            [-1, 1].forEach((d) => g.add(box(0.03, 0.08, BD.eye, d * 0.035, -0.33, 0.01))); // fangs
            g.position.set(x, top, 0.9); level.add(g);
            spiders.push({ x, y: cy, top, anchor, sy: top, vy: 0, st: "wait", t: (c * 0.17) % 1, g, legs, thread });
          } else if (t === "Ü") { // washing machine: white cabinet, control panel, round porthole with sloshing water and a sock spinning inside
            const g = new THREE.Group(); g.position.set(x, cy, 0.4);
            g.add(box(0.96, 1.08, BD.washer, 0, 0.56, 0)); g.add(box(0.96, 0.2, BD.washerD, 0, 1.0, 0.01));
            g.add(circle(0.05, MAT.spark, -0.3, 1.0, 0.02)); g.add(circle(0.06, BD.drum, 0.25, 1.0, 0.02));
            g.add(circle(0.33, BD.washerD, 0, 0.5, 0.01)); g.add(circle(0.27, BD.drum, 0, 0.5, 0.015));
            const drum = new THREE.Group(); drum.position.set(0, 0.5, 0.02);
            drum.add(box(0.5, 0.2, BD.water, 0, -0.12, 0)); drum.add(box(0.22, 0.08, BD.sock, 0.06, 0.06, 0.005)); drum.add(box(0.08, 0.08, BD.sockL, -0.06, 0.06, 0.006));
            g.add(drum); [-0.36, 0.36].forEach((d) => g.add(box(0.12, 0.04, BD.washerD, d, 0.02, 0.01)));
            level.add(g);
            washers.push({ x, y: cy, t: (c * 0.29) % 2.2, g, drum, dir: -1, rt: 0, kick: 0 });
          } else if (t === "İ") { // wooden stair step floating as a platform: tread and riser, split down the middle where it will snap
            const g = new THREE.Group(); g.position.set(x, y, 0.15);
            const half = (d) => { const h = new THREE.Group(); h.add(box(0.5, 0.2, MAT.woodL, d * 0.25, 0.4, 0)); h.add(box(0.5, 0.05, MAT.woodD, d * 0.25, 0.29, 0.01)); h.add(box(0.44, 0.7, MAT.wood, d * 0.23, -0.06, -0.01)); g.add(h); return h; };
            const L = half(-1), R = half(1);
            g.add(box(0.03, 0.18, MAT.woodD, 0.02, 0.4, 0.02));
            level.add(g);
            const f = { mesh: g, timer: -1, fallen: false, vy: 0, delay: 0.3 };
            fakes[c + "," + cy] = f; stairSteps.push({ f, x, L, R, cr: false, sn: false });
          } else if (t === "ı") { // loose floorboard on a little fulcrum, rows of nail tips under both ends
            level.add(box(0.18, 0.08, MAT.woodD, x, cy + 0.04, 0.44));
            const g = new THREE.Group(); g.position.set(x, cy + 0.1, 0.45);
            g.add(box(2.0, 0.1, MAT.wood, 0, 0, 0)); g.add(box(2.0, 0.025, MAT.woodL, 0, 0.04, 0.01));
            [-0.6, 0.6].forEach((d) => g.add(box(0.03, 0.08, MAT.woodD, d, 0, 0.01)));
            [-1, 1].forEach((d) => [0.68, 0.81, 0.94].forEach((o) => { g.add(box(0.03, 0.12, BD.steel, d * o, -0.1, -0.01)); g.add(box(0.07, 0.03, BD.steel, d * o, 0.05, 0.02)); }));
            level.add(g);
            flipBoards.push({ x, y: cy, py: cy + 0.1, st: "wait", t: 0, s: 1, m: 0, cool: 0, g });
          } else if (t === "-") { // ceiling fan on a rod under a beam; the whole fan drops
            const hy = cy + 3.6;
            level.add(box(1.8, 0.18, MAT.beam, x, hy + 0.86, 0.9)); level.add(box(0.36, 0.08, XR.hubD, x, hy + 0.74, 0.91));
            const g = new THREE.Group(), bl = new THREE.Group();
            g.add(box(0.06, 0.7, XR.hubD, 0, 0.35, 0)); g.add(box(0.4, 0.22, XR.hub, 0, 0, 0.01)); g.add(box(0.4, 0.04, XR.hubD, 0, 0.1, 0.02));
            bl.add(box(1.6, 0.07, XR.fan, 0, -0.08, 0.03)); bl.add(box(1.6, 0.02, XR.fanD, 0, -0.11, 0.035)); g.add(bl);
            g.add(circle(0.13, XR.hub, 0, -0.18, 0.04));
            g.position.set(x, hy, 1.0); level.add(g);
            droppers.push({ x, y: cy, py: hy, bot: 0.31, hw: 0.75, hh: 0.2, tell: 0.4, kind: "fan", st: "wait", t: 0, vy: 0, mesh: g, bl });
          } else if (t === "`") { // station sign hanging on two chains from a ceiling beam; the chains stay, the sign drops
            const hy = cy + 3.4;
            level.add(box(1.9, 0.18, MAT.beam, x, hy + 1.3, 0.9));
            [-0.55, 0.55].forEach((d) => level.add(box(0.04, 1.0, MT.rail, x + d, hy + 0.75, 0.95)));
            const g = new THREE.Group();
            g.add(box(1.5, 0.56, MT.nose, 0, 0, 0)); g.add(box(1.42, 0.48, new THREE.MeshBasicMaterial({ map: peronTex }), 0, 0, 0.01));
            [-0.55, 0.55].forEach((d) => g.add(circle(0.05, MT.railL, d, 0.27, 0.02)));
            g.position.set(x, hy, 1.0); level.add(g);
            droppers.push({ x, y: cy, py: hy, bot: 0.28, hw: 0.72, hh: 0.26, tell: 0.3, kind: "sign", st: "wait", t: 0, vy: 0, mesh: g });
          } else if (t === ".") { // cartoon penguin lying on its belly, beak toward her (faces +x by default)
            const g = new THREE.Group();
            const bd = circle(0.46, XR.peng, 0, 0.2, 0); bd.scale.y = 0.4; g.add(bd);
            const be = circle(0.4, XR.belly, 0.02, 0.13, 0.01); be.scale.y = 0.25; g.add(be);
            g.add(circle(0.16, XR.peng, 0.4, 0.26, 0.005)); g.add(circle(0.055, XR.eye, 0.45, 0.3, 0.02)); g.add(circle(0.027, XR.pupil, 0.47, 0.3, 0.03));
            g.add(tri([0.53, 0.29, 0.53, 0.21, 0.68, 0.25], XR.beak, 0.02));
            g.add(tri([-0.42, 0.22, -0.42, 0.12, -0.6, 0.2], XR.beak, -0.01)); // feet trailing behind
            g.add(tri([0.05, 0.3, -0.25, 0.4, -0.15, 0.27], XR.peng, 0.02)); // flipper
            g.scale.x = -1; g.position.set(x, cy, 1.1); level.add(g);
            penguins.push({ x, y: cy, vx: 0, vy: 0, st: "wait", dir: -1, dist: 0, sq: 0, mesh: g });
          } else if (t === '"') { // shooting gallery: striped awning, a head-height rail and 3 tin ducks
            level.add(box(7.6, 0.06, XR.rail, x, cy + 0.62, 0.9));
            [-3.8, 3.8].forEach((d) => { level.add(box(0.1, 2.5, XR.rail, x + d, cy + 1.25, 0.88)); });
            for (let k = 0; k < 13; k++) level.add(box(0.6, 0.34, k % 2 ? XR.stripeB : XR.stripeA, x - 3.6 + k * 0.6, cy + 2.55, 0.89));
            const ducks = [-2, 0, 2].map(() => {
              const g = new THREE.Group();
              g.add(box(0.04, 0.24, XR.rail, 0, -0.2, -0.01));
              const b = circle(0.25, XR.duck, 0, 0, 0); b.scale.y = 0.65; g.add(b);
              g.add(circle(0.13, XR.duck, 0.15, 0.2, 0.005)); g.add(circle(0.03, XR.pupil, 0.19, 0.24, 0.02));
              g.add(tri([0.26, 0.23, 0.26, 0.15, 0.38, 0.19], XR.beak, 0.02));
              const wg = circle(0.12, XR.duckD, -0.05, 0.01, 0.01); wg.scale.y = 0.6; g.add(wg);
              g.position.set(x, cy + 0.92, 1.0); level.add(g); return g;
            });
            duckRails.push({ x, y: cy + 0.92, ph: c * 0.7, dir: 0, ducks, xs: [0, 0, 0] });
          } else if (t === "â") { // crash cart: red trolley, defibrillator box with a ŞARJ screen, two paddles on coiled cords; arc fires toward her
            const g = new THREE.Group(); g.position.set(x, cy, 0.4);
            [-0.34, 0.34].forEach((d) => { g.add(box(0.05, 0.7, HP.frame, d, 0.45, 0)); g.add(circle(0.09, HM.tyre, d, 0.09, 0.02)); });
            g.add(box(0.82, 0.62, M(0xc4302b), 0, 0.5, 0.01)); [0.32, 0.5, 0.68].forEach((h) => g.add(box(0.78, 0.03, M(0x8e1c18), 0, h, 0.015)));
            g.add(box(0.86, 0.06, HP.tray, 0, 0.84, 0.02));
            g.add(box(0.6, 0.34, M(0xf2c53d), 0, 1.04, 0.02)); g.add(box(0.6, 0.05, M(0x2a2c30), 0, 0.89, 0.025));
            const scr = new THREE.MeshBasicMaterial({ map: sarjTex }); scr.color.setScalar(0.3); g.add(box(0.34, 0.14, scr, -0.06, 1.07, 0.03));
            const led = M(0x3a1a1a); g.add(circle(0.04, led, 0.2, 1.07, 0.03));
            const paddles = [-0.1, 0.1].map((d) => { const pd = box(0.12, 0.2, HP.pole, d, 1.32, 0.03); g.add(pd); return pd; });
            level.add(g);
            const am = new THREE.MeshBasicMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.95, depthWrite: false }), arc = new THREE.Group();
            for (let k = 0; k < 8; k++) arc.add(box(0.3, 0.05, am));
            const glow = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, opacity: 0.6 });
            glow.color.setRGB(0.5, 0.8, 1); arc.add(box(2.4, 0.9, glow, 0, 0, -0.01));
            arc.visible = false; level.add(arc);
            defibs.push({ x, y: cy, t: (c * 0.37) % 2, g, scr, led, paddles, arc, dir: -1, tell: false, on: false, rt: 0 });
          } else if (t === "î") { // big meatball with darker browned bits and a sprig of parsley; rolls at her
            const g = new THREE.Group();
            g.add(circle(1, KS.meatD, 0, 0, 0)); g.add(circle(0.9, M(0x9a4a32), 0, 0, 0.005));
            [[0.35, 0.3, 0.16], [-0.4, 0.15, 0.13], [0.05, -0.45, 0.15], [-0.2, 0.55, 0.1], [0.5, -0.25, 0.11], [-0.55, -0.35, 0.09]].forEach(([a, b, r]) => g.add(circle(r, M(0x6e2e1c), a, b, 0.01)));
            [[0.2, 0.05], [-0.1, -0.15], [-0.35, 0.4]].forEach(([a, b]) => g.add(circle(0.06, KS.fat, a, b, 0.015)));
            g.add(circle(0.12, M(0x3f8a3a), 0.15, 0.7, 0.02)); g.add(circle(0.09, M(0x56a84e), 0.28, 0.76, 0.025));
            g.position.set(x, cy + 0.6, 1.9); g.scale.setScalar(0.6); level.add(g);
            meatballs.push({ x, y: cy, vx: 0, vy: 0, r: 0.6, st: "wait", dir: -1, dist: 0, mesh: g });
          } else if (t === "û") { // theatre curtain: a red velvet drape from the flies with a heavy gold-weighted bottom bar
            const top = cy + 8, by = cy + 3.2;
            level.add(box(2.0, 0.2, ST.truss, x, top, 0.88)); level.add(box(2.0, 0.05, CF.gold, x, top - 0.1, 0.89));
            const drape = new THREE.Group();
            drape.add(box(1.7, 1, CF.velvet, 0, 0, 0)); [-0.6, -0.2, 0.2, 0.6].forEach((d) => drape.add(box(0.06, 1, M(0x5e0f18), d, 0, 0.005)));
            level.add(drape);
            const bar = new THREE.Group();
            bar.add(box(1.8, 0.24, ST.lamp, 0, 0, 0)); bar.add(box(1.8, 0.06, CF.gold, 0, 0.09, 0.01));
            [-0.6, 0, 0.6].forEach((d) => bar.add(box(0.16, 0.2, ST.lampL, d, -0.02, 0.01)));
            level.add(bar);
            const rope = box(0.03, 1, ST.string, x + 0.95, 0, 0.9); level.add(rope);
            curtains.push({ x, y: cy, top, rest: by, by, st: "wait", t: 0, vy: 0, drape, bar, rope, rt: 0 });
          } else if (t === "ê") { // big glass pickle jar on the floor: green brine, pickles and peppers inside, a tin lid
            const g = new THREE.Group(); g.position.set(x, cy, 0.4);
            const brine = M(0x8fbf4a, { transparent: true, opacity: 0.75 });
            g.add(box(0.62, 0.78, M(0xdfeef2, { transparent: true, opacity: 0.35 }), 0, 0.41, 0)); g.add(box(0.56, 0.66, brine, 0, 0.37, 0.005));
            [[-0.12, 0.25, 0.4], [0.12, 0.45, -0.3], [-0.05, 0.55, 0.2], [0.14, 0.2, 0.1]].forEach(([a, b, r]) => { const pk = box(0.13, 0.32, M(0x4f7a24), a, b, 0.01); pk.rotation.z = r; g.add(pk); });
            g.add(circle(0.06, M(0xd7261b), -0.15, 0.62, 0.012));
            g.add(box(0.06, 0.6, KS.fat, -0.22, 0.42, 0.015));
            const lid = box(0.6, 0.12, BD.brass, 0, 0.86, 0.02); g.add(lid);
            level.add(g);
            pjars.push({ x, y: cy, st: "wait", t: 0, g, lid, rt: 0 });
          } else if (t === "a") {
            triggers.push({ x, used: false });
          } else if (t === "j" || t === "e" || t === "b" || t === "k" || t === "f") {
            const s = { t, x, c, cy, used: false };
            if (t === "k") doorCols[c] = cy;
            if (t === "e") { s.mesh = pressButtonMesh(); s.mesh.position.set(x, cy, 0.45); level.add(s.mesh); s.pressT = -1; }
            if (t === "f") { // shorter mustard flag; spikes wait flat in the ground
              s.mesh = fakeFlagMesh(); s.mesh.position.set(x, cy, 0.4); level.add(s.mesh);
              s.spk = new THREE.Group();
              [-0.34, 0, 0.34].forEach((dx) => { const m = tri([dx - 0.17, 0, dx + 0.17, 0, dx, 0.75], MAT.spike, 0); m.add(tri([dx, 0, dx + 0.17, 0, dx, 0.75], MAT.spikeDark, 0.01)); s.spk.add(m); });
              s.spk.position.set(x, cy, 1.0); s.spk.scale.y = 0.001; level.add(s.spk);
            }
            surprises.push(s);
          } else if (t === "Б") { bossAt = { x, cy }; // Kukla hovers above this floor cell
          } else if (t === "б") { // boss floor button
            const m = bossBtnMesh(); m.position.set(x, cy, 0.45); level.add(m); bossBtns.push({ x, cy, m, used: false, glow: 0 });
          } else if (t === "P") {
            p = { x, y: cy + HH, vx: 0, vy: 0, onGround: false, face: 1, coyote: 0, buf: 0, jumping: false, ss: 0, ssV: 0, mvx: 0, rope: null, ropeCD: 0, spin: 0, wet: false, slideV: 0, fling: 0, flingV: 0, bonkT: 0, candy: false };
          } else if (t === "G") {
            const g = flagMesh(); g.position.set(x, cy, 0.4);
            level.add(g); flag = { x, y: cy + 1.3, mesh: g, runs: RUNFLAGS.includes(i), tx: x };
          }
        }
        // group side-by-side ceiling spikes into clusters that warn together and drop as a wave
        spikes.slice().sort((a, b) => a.y - b.y || a.x - b.x).forEach((s, i, arr) => {
          const q = arr[i - 1];
          s.cl = q && q.y === s.y && Math.abs(s.x - q.x - 1) < 0.01 ? q.cl : [];
          s.cl.push(s);
        });
        // faint crack and shadow on the floor where each ceiling spike will land
        const crackMat = M(0x000000, { transparent: true, opacity: 0.3 }), crackLine = M(0x111111, { transparent: true, opacity: 0.55 });
        for (const s of spikes) {
          const cx = Math.floor(s.x); let fy = Math.floor(s.y) - 1;
          while (fy >= 0 && !isGroundChar(tile(cx, fy))) fy--;
          if (fy < 0) continue;
          const top = fy + 1, mk = new THREE.Group();
          const sh = circle(0.32, crackMat, 0, 0, 0); sh.scale.y = 0.18; mk.add(sh);
          [[-0.1, -0.03, 0.12, 0.5], [0.0, -0.06, 0.1, -0.7], [0.08, -0.04, 0.1, 0.9]].forEach(([dx, dy, w, rot]) => {
            const ln = box(w, 0.018, crackLine, dx, dy, 0.005); ln.rotation.z = rot; mk.add(ln);
          });
          mk.position.set(s.x, top, 0.06); level.add(stat(mk));
        }
        setupBoss(i, BOSS_LVLS.includes(i) ? bossAt : null, bossBtns); // full HP on every (re)start
        if (cpSpawn && p) { p.x = cpSpawn.x; p.y = cpSpawn.y + HH; p.face = 1; } // respawn at the last touched checkpoint
        player.rotation.z = 0; player.visible = true; player.position.z = 2; shakeT = 0;
        player.traverse((o) => { if (o.userData.mat0) { o.material = o.userData.mat0; delete o.userData.mat0; } }); // undo the welder's char
        cane.visible = true; bunO = 0; bunV = 0; lastVy = 0;
        dark.visible = mod === "dark"; torch.visible = dark.visible; armB.visible = torch.visible; dipT = 0; wobT = 0; beamA = p && p.face < 0 ? -Math.PI + 0.1 : -0.1;
        clearTimeout(warnT);
        if (mod === "rev") { toast.textContent = T("Kontroller ters!"); toast.classList.add("is-on"); warnT = setTimeout(() => { if (state !== "dead") toast.classList.remove("is-on"); }, 1800); }
        document.getElementById("hudLevel").textContent = T("Bölüm") + " " + (i + 1) + "/" + TOTAL;
        const nm = NAMES[i];
        if (nm) document.getElementById("hudLevel").textContent += " · " + T(nm);
        // freeze static scenery: ground tiles that never fall or open, fill boxes, decor; their matrices are computed once
        const moving = new Set(); for (const k in fakes) moving.add(fakes[k].mesh); for (const k in doors) moving.add(doors[k].mesh);
        for (const g of statics) if (!moving.has(g)) { g.updateMatrixWorld(true); g.traverse((o) => { o.matrixAutoUpdate = false; }); }
        statics = [];
      }

      /* ===== Input: keyboard ===== */
      const keys = {}, touch = { left: false, right: false, jump: false };
      let jumpPressed = false;
      const JUMP_KEYS = ["KeyW", "Space", "ArrowUp"];
      addEventListener("keydown", (e) => {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
        if (JUMP_KEYS.includes(e.code) && !keys[e.code]) jumpPressed = true;
        keys[e.code] = true;
        if (e.code === "Enter" && state === "menu") onStart();
      });
      addEventListener("keyup", (e) => { keys[e.code] = false; });

      /* ===== Input: touch buttons (multi-touch via pointer events) ===== */
      function bindBtn(id, name) {
        const b = document.getElementById(id);
        const down = (e) => { e.preventDefault(); if (name === "jump" && !touch.jump) jumpPressed = true; touch[name] = true; b.classList.add("is-down"); try { b.setPointerCapture(e.pointerId); } catch (_) {} };
        const up = (e) => { e.preventDefault(); touch[name] = false; b.classList.remove("is-down"); };
        b.addEventListener("pointerdown", down);
        ["pointerup", "pointercancel", "lostpointercapture"].forEach((ev) => b.addEventListener(ev, up));
        b.addEventListener("contextmenu", (e) => e.preventDefault());
      }
      bindBtn("btnJump", "jump");

      /* ===== Input: floating joystick on the left 55%, tracked by touch identifier ===== */
      let joyJump = false; // held while the knob is pushed up, so the jump keeps its full height
      const joy = { id: null, x: 0, y: 0, up: false };
      const joyZone = document.getElementById("joyZone"), joyEl = document.getElementById("joy"), joyKnob = document.getElementById("joyKnob");
      function joyReset() {
        joy.id = null; joy.up = false; joyJump = false; touch.left = touch.right = false;
        joyEl.classList.remove("is-on"); joyKnob.style.transform = "";
      }
      function joyFind(list) { for (const t of list) if (t.identifier === joy.id) return t; return null; }
      function joyMove(t) {
        const r = joyEl.offsetWidth / 2 || 55;
        let dx = t.clientX - joy.x, dy = t.clientY - joy.y;
        const d = Math.hypot(dx, dy); if (d > r) { dx *= r / d; dy *= r / d; }
        joyKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        touch.left = dx < -0.22 * r; touch.right = dx > 0.22 * r;
        const up = dy < -0.6 * r;
        if (up && !joy.up) jumpPressed = true; // edge-triggered jump
        joy.up = up; joyJump = up;
      }
      joyZone.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (joy.id !== null) return;
        const t = e.changedTouches[0];
        joy.id = t.identifier; joy.x = t.clientX; joy.y = t.clientY; joy.up = false;
        joyEl.style.left = t.clientX + "px"; joyEl.style.top = t.clientY + "px";
        joyKnob.style.transform = ""; joyEl.classList.add("is-on");
      }, { passive: false });
      joyZone.addEventListener("touchmove", (e) => { e.preventDefault(); const t = joyFind(e.changedTouches); if (t) joyMove(t); }, { passive: false });
      const joyEnd = (e) => { if (joyFind(e.changedTouches)) joyReset(); };
      joyZone.addEventListener("touchend", joyEnd); joyZone.addEventListener("touchcancel", joyEnd);
      new MutationObserver(() => { if (document.body.classList.contains("in-menu") || document.body.classList.contains("in-story")) joyReset(); })
        .observe(document.body, { attributes: true, attributeFilter: ["class"] });
      document.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
      document.addEventListener("gesturestart", (e) => e.preventDefault());
      document.addEventListener("dblclick", (e) => e.preventDefault());

      /* ===== Death and level flow ===== */
      const toast = document.getElementById("toast");
      const flashEl = document.getElementById("flash");
      const rnd = (a, b) => a + Math.random() * (b - a);

      /* ===== Sound: tiny WebAudio synth (created on Başla, a user gesture) ===== */
      let AC = null, master = null, noiseBuf = null, sawGain = null;
      // iOS suspends or interrupts the context (lock screen, calls, app switch); any tap brings it back
      const audioWake = () => { if (AC && (AC.state === "suspended" || AC.state === "interrupted")) AC.resume().catch(() => {}); };
      ["touchend", "click"].forEach((ev) => document.addEventListener(ev, audioWake, { passive: true, capture: true }));
      function audioInit() {
        if (AC) { if (AC.state === "suspended" || AC.state === "interrupted") AC.resume(); return; }
        try {
          AC = new (window.AudioContext || window.webkitAudioContext)();
          master = AC.createGain(); master.gain.value = 0.5; master.connect(AC.destination);
          noiseBuf = AC.createBuffer(1, AC.sampleRate, AC.sampleRate);
          const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
          // saw whirr: a wobbling sawtooth through a bandpass, loudness set by distance to the nearest saw
          const o = AC.createOscillator(), lfo = AC.createOscillator(), lg = AC.createGain(), f = AC.createBiquadFilter();
          o.type = "sawtooth"; o.frequency.value = 170; lfo.frequency.value = 23; lg.gain.value = 35;
          f.type = "bandpass"; f.frequency.value = 1300; f.Q.value = 1.5;
          sawGain = AC.createGain(); sawGain.gain.value = 0;
          lfo.connect(lg).connect(o.frequency); o.connect(f).connect(sawGain).connect(master); o.start(); lfo.start();
          // eerie drone: detuned low oscillators through a lowpass that a slow LFO opens and closes
          const dg = AC.createGain(), df = AC.createBiquadFilter(), dl = AC.createOscillator(), dlg = AC.createGain();
          const tl = AC.createOscillator(), tlg = AC.createGain();
          df.type = "lowpass"; df.frequency.value = 260; df.Q.value = 4; dg.gain.value = 0.07;
          dl.frequency.value = 0.07; dlg.gain.value = 160; dl.connect(dlg).connect(df.frequency);
          tl.frequency.value = 0.13; tlg.gain.value = 0.025; tl.connect(tlg).connect(dg.gain);
          [[55, "sawtooth"], [55.6, "sawtooth"], [82.4, "triangle"], [116.5, "sine"]].forEach(([fq, ty]) => {
            const d = AC.createOscillator(); d.type = ty; d.frequency.value = fq; d.connect(df); d.start();
          });
          df.connect(dg).connect(master); dl.start(); tl.start(); droneG = dg; droneHi = false;
          scheduleClang();
        } catch (_) { AC = null; }
      }
      // a distant metal clang every 7 to 18 s: inharmonic partials, muffled, with a faint echo
      function scheduleClang() {
        setTimeout(() => {
          if (AC && state !== "menu" && !window.orientPaused) [0, 0.38].forEach((d, e) => {
            [[211, 1.6], [563, 1.1], [897, 0.8], [1341, 0.5]].forEach(([fq, dur]) => tone("triangle", fq, fq * 0.985, dur * 1.4, (e ? 0.012 : 0.035), d));
            noise(0.08, "bandpass", 1800, 900, e ? 0.03 : 0.08);
          });
          scheduleClang();
        }, 7000 + Math.random() * 11000);
      }
      // heartbeat: lub-dub, faster the closer a saw or crusher is
      let heartT = 0, danger = 99;
      function heartbeat(dt) {
        if (!AC || danger > 7 || state !== "play") { heartT = Math.min(heartT, 0.3); return; }
        heartT -= dt;
        if (heartT > 0) return;
        const k = 1 - danger / 7; heartT = 1.05 - 0.7 * k;
        const v = 0.25 + 0.35 * k;
        tone("sine", 70, 38, 0.14, v); tone("sine", 64, 36, 0.12, v * 0.7, 0.17);
      }
      function tone(type, f0, f1, dur, vol, delay) {
        if (!AC) return; const t = AC.currentTime + (delay || 0), o = AC.createOscillator(), g = AC.createGain();
        o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
        g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g).connect(master); o.start(t); o.stop(t + dur + 0.02);
      }
      function noise(dur, type, f0, f1, vol) {
        if (!AC) return; const t = AC.currentTime, s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
        s.buffer = noiseBuf; f.type = type; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
        g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        s.connect(f).connect(g).connect(master); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
      }
      /* ===== Zone music: one short procedural loop per zone, quiet, on its own gain under the SFX ===== */
      const MF = (m) => 440 * 2 ** ((m - 69) / 12);
      let musicG = null, musicOn = true, mZone = -1, mStep = 0, mNext = 0;
      function mn(t, ty, f0, f1, dur, vol, a, lp) { // one note: attack a, exponential decay, optional lowpass
        const o = AC.createOscillator(), g = AC.createGain(); let out = o;
        o.type = ty; o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (a || 0.005)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        if (lp) { const f = AC.createBiquadFilter(); f.frequency.value = lp; o.connect(f); out = f; }
        out.connect(g).connect(musicG); o.start(t); o.stop(t + dur + 0.05);
      }
      function mz(t, ty, f0, f1, dur, vol, a) { // filtered noise burst or swell
        const s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
        s.buffer = noiseBuf; s.loop = true; f.type = ty; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (a || 0.005)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        s.connect(f).connect(g).connect(musicG); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
      }
      const MUS = [ // [step seconds, fn(step, time, stepLen)]
        [0.3, (n, t, s) => { // Bodrum: low drone + slow drips
          if (n % 16 === 0) { mn(t, "triangle", 41.2, 41.2, s * 17, 0.07, 1.5); mn(t, "sine", 61.7, 61.7, s * 17, 0.035, 2); }
          const k = [3, 7, 10, 13].indexOf(n % 16);
          if (k >= 0) { const f = MF([88, 84, 91, 86][k]); mn(t, "sine", f, f * 0.8, 0.22, 0.05); mn(t + s * 1.5, "sine", f, f * 0.8, 0.18, 0.015); }
        }],
        [0.36, (n, t, s) => { // Huzurevi: out-of-tune music box waltz
          const m = [76, 79, 83, 81, 79, 76, 74, 77, 81, 79, 76, 72][n % 12], f = MF(m) * (1 + (Math.random() - 0.5) * 0.03);
          mn(t, "triangle", f, f * 0.985, s * 2.2, 0.045); mn(t, "sine", f * 2, f * 2, 0.3, 0.012);
          if (n % 3 === 0) { const b = MF([45, 43, 41, 40][Math.floor(n / 3) % 4]); mn(t, "sine", b, b, s * 2.5, 0.06); }
        }],
        [0.25, (n, t, s) => { // Hastane: monitor beeps + cold pad
          const k = n % 16;
          if (k === 0) [57, 60, 64, 71].forEach((m) => mn(t, "sine", MF(m), MF(m), s * 17, 0.02, 1.2));
          if (k === 0 || k === 8 || n % 32 === 13) mn(t, "square", 988, 988, 0.09, 0.022, 0.005, 2500);
        }],
        [0.34, (n, t, s) => { // Kasap: heavy thuds + creaky squeezebox
          const k = n % 8, m = [57, , 60, 59, , , 56][k];
          if (k === 0 || k === 5) { mn(t, "sine", 95, 38, 0.35, 0.13); mz(t, "lowpass", 400, 120, 0.15, 0.08); }
          if (m) { const f = MF(m - (n % 16 > 7 ? 2 : 0)); mn(t, "square", f, f * 0.99, s * 1.6, 0.03, 0.08, 900); mn(t, "square", f * 1.008, f * 0.995, s * 1.6, 0.025, 0.08, 900); }
        }],
        [0.24, (n, t, s) => { // Lunapark: wonky carnival organ, oom-pah-pah
          const k = n % 3, b = Math.floor(n / 3) % 4;
          if (k === 0) { const f = MF([43, 38, 43, 36][b]); mn(t, "triangle", f, f, s * 0.9, 0.07); }
          else [62, 67].forEach((m) => mn(t, "square", MF(m - (b === 3 ? 2 : 0)), MF(m - (b === 3 ? 2 : 0)), s * 0.5, 0.012, 0.005, 1400));
          const f = MF([67, 66, 67, 72, 71, 70, 69, 68, 67, 63, 64, 62][n % 12]) * (1 + Math.sin(n) * 0.012);
          mn(t, "square", f, f, s * 0.9, 0.02, 0.01, 1800); mn(t, "square", f * 1.012, f * 1.012, s * 0.9, 0.016, 0.01, 1800);
        }],
        [0.28, (n, t, s) => { // Kanalizasyon: bubbly bass + echoey drops
          const k = n % 8;
          if (k === 0 || k === 3 || k === 5) mn(t, "sine", 45, 80, s * 0.9, 0.11, 0.02);
          if (Math.random() < 0.35) { const f = rnd(300, 600); mn(t + s / 2, "sine", f, f * 2.5, 0.06, 0.02); }
          if (k === 2 || k === 6) { const f = MF(k === 2 ? 81 : 76); [0, 1, 2].forEach((e) => mn(t + e * 0.27, "sine", f, f * 0.7, 0.2, 0.045 / (1 + e * 2))); }
        }],
        [0.25, (n, t, s) => { // Fabrika: clanks in 4/4 + low hum
          const k = n % 8;
          if (k === 0) mn(t, "sawtooth", 50, 50, s * 8.6, 0.05, 0.2, 180);
          if (k === 0 || k === 4) { mn(t, "triangle", 320, 300, 0.25, 0.05); mn(t, "triangle", 471, 460, 0.2, 0.035); mz(t, "bandpass", 2200, 1200, 0.06, 0.06); }
          if (k === 2 || k === 6) mz(t, "bandpass", 900, 600, 0.08, 0.05);
          mz(t, "highpass", 6000, 5000, 0.02, 0.02);
        }],
        [0.36, (n, t, s) => { // Buzhane: glassy bells + wind
          const k = n % 8, m = [88, , , 91, , 86][k];
          if (k === 0) mz(t, "bandpass", 500, 1400, s * 8.5, 0.05, s * 3);
          if (m) { const f = MF(m - (n % 16 > 7 ? 3 : 0)); mn(t, "sine", f, f, 1.4, 0.03); mn(t, "sine", f * 2.76, f * 2.76, 0.5, 0.01); }
        }],
        [0.3, (n, t, s) => { // Metro: rumbling train bass + distant horn
          const k = n % 4;
          if (n % 8 === 0) mz(t, "lowpass", 160, 120, s * 8.5, 0.12, 0.3);
          if (k < 2) mn(t, "sawtooth", k ? 49 : 41, k ? 49 : 41, s * 0.8, 0.05, 0.01, 220);
          mz(t, "bandpass", 3000, 2500, 0.03, k % 2 ? 0.025 : 0.01);
          if (n % 48 === 40) [56, 60].forEach((m, i) => mn(t + i * 0.05, "sawtooth", MF(m), MF(m) * 0.98, 1.6, 0.02, 0.25, 700));
        }],
        [0.2, (n, t, s) => { // Stüdyo: creepy tango, pizzicato + brushed snare
          const k = n % 8, i = [0, 3, 4, 6].indexOf(k), m = [76, , 75, 76, , 81, , 72, 71, , 72, 74, , 68][n % 16], sn = k === 2 || k === 6;
          if (i >= 0) { const f = MF((n % 16 > 7 ? [40, 40, 47, 44] : [45, 45, 52, 45])[i]); mn(t, "triangle", f, f, 0.18, k ? 0.06 : 0.09); }
          if (m) mn(t, "triangle", MF(m), MF(m) * 0.99, 0.1, 0.035);
          mz(t, "highpass", 4000, 3000, sn ? 0.14 : 0.05, sn ? 0.06 : 0.015, 0.02);
        }],
      ];
      function musicCut() { if (!musicG) return; const g = musicG; musicG = null; g.gain.setTargetAtTime(0, AC.currentTime, 0.15); setTimeout(() => g.disconnect(), 1500); }
      function musicTick() { // called every frame; schedules a quarter second ahead
        if (!AC || !master) return;
        if (state === "menu" || state === "won" || window.orientPaused) { musicCut(); mZone = -1; return; }
        const z = zoneOf(levelIdx), now = AC.currentTime, [sd, fn] = MUS[z], s = sd / (boss && boss.st === "fight" ? 1.25 : 1);
        if (z !== mZone || !musicG || mNext < now - 0.5) {
          musicCut(); musicG = AC.createGain(); musicG.gain.value = musicOn ? 0.6 : 0; musicG.connect(master);
          mZone = z; mStep = 0; mNext = now + 0.08;
        }
        while (mNext < now + 0.25) { if (musicOn) fn(mStep, mNext, s); mNext += s; mStep++; }
      }
      musicOn = window.musicOn !== false;
      window.setMusic = (on) => { musicOn = on; if (musicG && AC) musicG.gain.setTargetAtTime(on ? 0.6 : 0, AC.currentTime, 0.1); };
      const SFX = {
        step: () => noise(0.03, "highpass", 3000, 2000, 0.1),
        tap: () => { tone("square", 1500, 900, 0.03, 0.05); noise(0.025, "bandpass", 2500, 1500, 0.08); },
        jump: () => { tone("sawtooth", 175, 125, 0.11, 0.05); tone("triangle", 150, 138, 0.06, 0.06, 0.13); tone("triangle", 140, 100, 0.1, 0.06, 0.2); noise(0.08, "bandpass", 900, 2500, 0.05); }, // "Ah belim!" grunt
        land: (k) => { noise(0.1, "lowpass", 700, 150, 0.15 + 0.25 * k); tone("sine", 140, 55, 0.1, 0.1 + 0.2 * k); },
        rope: () => { noise(0.07, "bandpass", 1600, 700, 0.18); tone("triangle", 330, 210, 0.09, 0.08); },
        splash: () => { noise(0.55, "lowpass", 4000, 300, 0.4); tone("sine", 700, 160, 0.25, 0.08); },
        boom: () => { noise(1.0, "lowpass", 2000, 50, 0.8); tone("sine", 95, 28, 0.7, 0.55); },
        // surprise-trap sounds
        sting: () => { [180, 191, 203].forEach((f) => tone("sawtooth", f, f * 0.35, 0.6, 0.3)); tone("square", 1250, 420, 0.45, 0.16); tone("square", 1330, 460, 0.45, 0.12); noise(0.5, "bandpass", 3200, 700, 0.9); },
        bang: () => { noise(0.45, "lowpass", 3000, 70, 1.0); tone("sine", 120, 32, 0.4, 0.7); tone("square", 85, 40, 0.15, 0.22); },
        screech: () => { [0, 0.22].forEach((d) => { tone("sawtooth", 2600, 1300, 0.28, 0.14, d); tone("square", 3300, 1900, 0.24, 0.06, d + 0.02); }); noise(0.4, "bandpass", 4000, 2200, 0.25); },
        creak: () => { tone("sawtooth", 210, 150, 0.4, 0.06); tone("square", 320, 260, 0.3, 0.025, 0.06); noise(0.35, "bandpass", 1800, 900, 0.06); },
        click: () => { tone("square", 1900, 900, 0.03, 0.18); tone("square", 1300, 600, 0.04, 0.14, 0.05); tone("sawtooth", 230, 110, 0.3, 0.07, 0.08); },
        laugh: () => [0, 1, 2, 3, 4].forEach((i) => { tone("square", 560 - i * 35, 400 - i * 35, 0.11, 0.12, i * 0.14); tone("triangle", 1120 - i * 70, 800 - i * 70, 0.09, 0.06, i * 0.14); }),
        whoosh: (k) => { noise(0.4, "bandpass", 380, 2200, 0.32 * k); noise(0.3, "lowpass", 900, 250, 0.12 * k); },
        squeak: () => { tone("square", 1700, 2300, 0.06, 0.035); tone("square", 2300, 1600, 0.05, 0.03, 0.07); },
        chatter: () => [0, 0.05, 0.1].forEach((d) => { tone("square", 950, 700, 0.025, 0.05, d); noise(0.02, "highpass", 3500, 2500, 0.05); }),
        needle: () => { tone("triangle", 900, 1500, 0.08, 0.05); noise(0.12, "bandpass", 2600, 1200, 0.1); },
        crash: () => { noise(0.3, "highpass", 2500, 900, 0.35); tone("square", 600, 200, 0.12, 0.08); noise(0.2, "lowpass", 800, 150, 0.3); },
        tick: () => { noise(0.04, "highpass", 4000, 2500, 0.06); tone("square", 120, 60, 0.05, 0.03); },
        whisper: () => { noise(1.2, "bandpass", 2400, 1200, 0.08); tone("sine", 233, 220, 1.2, 0.04); tone("sine", 247, 233, 1.2, 0.03); },
        zap: () => { noise(0.25, "bandpass", 3500, 1200, 0.25); tone("sawtooth", 160, 90, 0.25, 0.08); tone("square", 2400, 600, 0.08, 0.05); },
        ding: () => { tone("sine", 1568, 1568, 0.35, 0.16); tone("sine", 3136, 3136, 0.18, 0.05); tone("triangle", 2093, 2093, 0.4, 0.1, 0.09); },
        beep: () => { tone("square", 880, 860, 0.09, 0.06); tone("square", 880, 860, 0.09, 0.06, 0.18); },
        wah: () => [392, 370, 349, 311].forEach((f, i) => tone("triangle", f, f * (i === 3 ? 0.9 : 0.97), i === 3 ? 0.6 : 0.22, 0.14, 0.12 + i * 0.25)),
      };
      const buzz = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (_) {} };

      /* ===== Dust puffs: jump, landing, turning while running ===== */
      function dust(x, y, n, dir) {
        for (let i = 0; i < n; i++) {
          const m = circle(rnd(0.06, 0.12), new THREE.MeshBasicMaterial({ color: 0x77736d, transparent: true, opacity: 0.75 }));
          m.position.set(x + rnd(-0.15, 0.15), y + 0.06, 0);
          addBit(m, { vx: dir ? dir * rnd(0.8, 2.4) : rnd(-2.2, 2.2), vy: rnd(0.3, 1.2), g: 0, life: rnd(0.3, 0.5), grow: 2, fade: true, z: 2.3 });
        }
      }
      // A flying particle: gravity g, spin, optional fade/grow over its life
      function addBit(mesh, o) { mesh.position.z = o.z || 2.5; level.add(mesh); bits.push(Object.assign({ mesh, vx: 0, vy: 0, g: GRAV, spin: 0, life: 1.6, age: 0, grow: 0 }, o)); }
      function burst() {
        const x = p.x, y = p.y;
        const wrap = (m, dx, dy) => { const g = new THREE.Group(); m.position.set(dx, dy, m.position.z); g.add(m); return g; };
        const t = makeTorso(); t.rotation.z = 0;
        const glasses = new THREE.Group(); glasses.add(circle(0.06, MAT.nLens)); glasses.add(ring(0.05, 0.064, MAT.nGlass, 0, 0, 0.01)); glasses.add(rbox(0.09, 0.01, MAT.nGlass, -0.1, 0.008, 0.01, 0.06));
        const parts = [[makeHead().g, 0.32], [wrap(t, 0, -0.1), 0.08], [wrap(makeSkirt(), 0, -0.28), -0.17],
          [wrap(makeLeg(), 0, 0.09), -0.33], [wrap(makeLeg(), 0, 0.09), -0.33], [wrap(makeArm(false), 0, 0.11), 0.1], [wrap(makeArm(true), 0, 0.11), 0.1], [glasses, 0.35]];
        parts.forEach(([m, dy], i) => { m.position.set(x, y + dy, 0); m.scale.x = p.face; addBit(m, { vx: rnd(-6, 6), vy: rnd(7, 15), spin: rnd(-14, 14), z: 2.6 + i * 0.01 }); });
        for (let i = 0; i < 10; i++) {
          const m = circle(rnd(0.25, 0.5), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x777777 : 0x555555, transparent: true, opacity: 0.75 }));
          m.position.set(x + rnd(-0.5, 0.5), y + rnd(-0.3, 0.4), 0);
          addBit(m, { vx: rnd(-1, 1), vy: rnd(0.8, 2.2), g: 0, life: rnd(1.1, 1.6), grow: 1.4, fade: true, z: 3.1 + i * 0.01 });
        }
      }
      // Saw death: the body splits at the waist and the two halves fly apart
      function cut(dir) {
        const halves = [new THREE.Group(), new THREE.Group()];
        nineBody.children.forEach((c) => { const m = c.clone(); m.position.y -= 0.4; halves[c.position.y > 0.4 ? 0 : 1].add(m); });
        halves.forEach((g, i) => {
          g.scale.set(p.face * NINE_S, NINE_S, 1); g.position.set(p.x, p.y - HH + 0.4 * NINE_S + nineBody.position.y, 0);
          addBit(g, { vx: (i ? -1 : 1) * dir * rnd(3, 5), vy: i ? rnd(3, 5) : rnd(7, 10), spin: (i ? 1 : -1) * dir * rnd(6, 10), z: 2.6 + i * 0.01 });
        });
        for (let i = 0; i < 10; i++) { const m = circle(rnd(0.03, 0.06), MAT.spark); m.position.set(p.x, p.y - HH + 0.4, 0); addBit(m, { vx: rnd(-6, 6), vy: rnd(2, 7), life: 0.6 }); }
      }
      function splash() {
        for (let i = 0; i < 14; i++) {
          const m = circle(rnd(0.05, 0.11), i % 3 ? MAT.foam : MAT.water);
          m.position.set(p.x + rnd(-0.3, 0.3), Math.floor(p.y - HH + 0.25) + 0.9, 0);
          addBit(m, { vx: rnd(-3, 3), vy: rnd(4, 8), life: 1 });
        }
      }
      function updateBits(dt) {
        for (let i = bits.length - 1; i >= 0; i--) {
          const b = bits[i]; b.age += dt; b.vy -= b.g * dt;
          b.mesh.position.x += b.vx * dt; b.mesh.position.y += b.vy * dt; b.mesh.rotation.z += b.spin * dt;
          if (b.grow) b.mesh.scale.setScalar(1 + b.age * b.grow);
          if (b.fade) b.mesh.material.opacity = Math.max(0, 0.75 * (1 - b.age / b.life));
          if (b.age > b.life) { level.remove(b.mesh); freeObj(b.mesh, !!b.fade); bits.splice(i, 1); } // a fading bit owns its material
        }
      }
      function die(kind, dir) {
        if (state !== "play") return;
        if (p.rope) { p.rope.held = false; p.rope = null; }
        state = "dead"; deadTimer = 1.6; deaths++; slowT = 0.6; dieT = 0; hitT = 0.08; // hit-stop, then slow-mo
        SFX.wah(); buzz(kind === "boom" ? 160 : 60);
        if (boss && boss.st === "fight") bossDied = true; // the hint returns for 3 s when the fight restarts
        if (kind === "boom") SFX.boom(); else if (kind === "water") SFX.splash();
        document.getElementById("hudDeaths").textContent = T("Ölüm sayısı") + ": " + deaths;
        sdkSave();
        const pool = Math.random() < 0.3 ? NINE_GRUMBLES : DEATH_LINES; // 30%: Nine grumbles herself
        toast.textContent = T(pool[Math.floor(Math.random() * pool.length)]);
        toast.classList.add("is-on");
        flashEl.classList.remove("is-on"); void flashEl.offsetWidth; flashEl.classList.add("is-on");
        p.kind = kind;
        flingCane(dir);
        if (kind === "arrow") { const d = dir || -p.face; p.vx = d * 6; p.vy = 6; p.spin = -d * 14; }
        else if (kind === "spike" || kind === "squash") { p.vx = 0; p.vy = 0; if (kind === "squash") shakeT = 0.35; }
        else if (kind === "boom") { p.vx = 0; p.vy = 0; player.visible = false; burst(); shakeT = 0.6; }
        else if (kind === "saw") { p.vx = 0; p.vy = 0; player.visible = false; cut(dir || 1); shakeT = 0.3; }
        else if (kind === "water") { p.vx *= 0.15; p.vy = 0; player.position.z = 0.2; splash(); }
        else if (kind === "burn") { // welder: charred black where she stands, smoking and sparking, then topples over
          p.vx = 0; p.vy = 0; p.bx = p.x; p.by = p.y - HH; p.bvy = 0; p.smT = 0; p.thud = false;
          let r = Math.floor(p.by - 0.01); while (r >= 0 && !solid(Math.floor(p.x), r)) r--;
          p.fl = r >= 0 ? Math.min(p.by, r + 1) : p.by;
          player.traverse((o) => { if (o.material && !o.material.transparent && !o.userData.mat0) { o.userData.mat0 = o.material; o.material = FB.char; } });
          for (let i = 0; i < 12; i++) { const m = circle(rnd(0.03, 0.05), MAT.spark); m.position.set(p.x, p.y, 0); addBit(m, { vx: rnd(-5, 5), vy: rnd(2, 6), life: 0.5, z: 2.7 }); }
          shakeT = 0.25;
        }
        else { p.vx *= 0.3; } // fall: keep falling, arms flail
      }
      // On any death the cane leaves her hand and spins away
      function flingCane(dir) {
        if (!cane.visible) return;
        player.updateMatrixWorld(true);
        const v = caneMid.getWorldPosition(_v3);
        const g = new THREE.Group(), c = makeCane(); c.position.y = CANE_L / 2; g.add(c);
        g.scale.set(p.face * NINE_S, NINE_S, 1); g.position.set(v.x, v.y, 0);
        g.rotation.z = player.rotation.z + p.face * (armF.rotation.z + cane.rotation.z);
        cane.visible = false;
        const d = dir || (Math.random() < 0.5 ? -1 : 1);
        addBit(g, { vx: d * rnd(2.5, 5), vy: rnd(7, 11), spin: -d * rnd(9, 15), z: 2.7, life: 1.8 });
      }
      function restart() { toast.classList.remove("is-on"); flashEl.classList.remove("is-on"); buildLevel(levelIdx); state = "play"; }

      /* ===== Kukla: appears on the old TV at each level start, types a line, 2.5 s, tap or key skips ===== */
      const KUKLA = [
        "Merhaba... Bir oyun oynayalım.", "Hayatta kalmak istiyor musun?", "İpler çürük. Tıpkı umutların gibi.",
        "Bu kez kaçamazsın.", "Kutular seni korur mu? Göreceğiz.", "Testereler aç... ve sabırsız.",
        "Zincirlere güvenme.", "Karanlıktan korkar mısın?", "Her şey tersine döndü.", "Seçim senin.",
      ];
      const KUKLA2 = [ // generated levels 11–200
        "Sona daha çok var. Acele etme.", "Zemini dinle... yalan söylüyor.", "Seni izliyorum, nine.", "Her adım bir karar.",
        "Dün buradan geçen geri dönmedi.", "Bayrak gerçek mi? Emin misin?", "Bastonunun sesini tuzaklar da duyuyor.", "Kural basit: yaşa ya da öl.",
        "Taş top seni hatırlıyor.", "Korkunu duyabiliyorum.", "Burada hiçbir şey göründüğü gibi değil.", "Bir oyun daha... sadece bir tane.",
        "Saat işliyor. Tik tak.", "Pes edersen ben kazanırım.", "Karanlıkta seni bekleyen bir şey var.",
      ];
      const tvEl = document.getElementById("kukla"), tvText = document.getElementById("kuklaText");
      let typeT = 0, introT = 0, introGrace = false;
      function showKukla(i) {
        const msg = T(BOSS_LVLS.includes(i) ? (BOSS_CFG[i]?.intro || "Düğmeler yeşil yanınca bas, nine. İplerimi koparabilirsen…") : i < KUKLA.length ? KUKLA[i] : KUKLA2[(i * 7) % KUKLA2.length]); let n = 0;
        document.getElementById("kuklaCode").textContent = T("Kod") + ": " + codeOf(i + 1) + " · " + T("Geçmek için dokun");
        tvText.textContent = ""; tvEl.hidden = false; state = "intro"; SFX.whisper();
        clearInterval(typeT); clearTimeout(introT);
        typeT = setInterval(() => { n++; tvText.textContent = msg.slice(0, n); if (n >= msg.length) clearInterval(typeT); }, Math.min(55, 1500 / msg.length));
        introT = setTimeout(endIntro, 2500);
      }
      function endIntro() {
        clearInterval(typeT); clearTimeout(introT); tvEl.hidden = true;
        if (state === "intro") { state = "play"; introGrace = true; }
      }
      document.addEventListener("pointerdown", () => { if (state === "intro") endIntro(); }, true);
      addEventListener("keydown", () => { if (state === "intro") endIntro(); }, true);

      /* ===== Zone title card: at each zone's first level, 2 s before Kukla, tap or key skips ===== */
      const zoneEl = document.getElementById("zoneCard");
      let zoneT = 0, zoneLvl = 0;
      /* ===== Story: Kukla stole Nine's false teeth and pension card on payday ===== */
      const K = (text) => ({ who: "kukla", text }), N = (text) => ({ who: "nine", text }), Tl = (text) => ({ who: "", text });
      const STORY_INTRO = [
        Tl("Maaş günü. Nine erkenden kalktı, dişlerini bardaktan aldı... Bardak boştu."),
        K("Dişlerin bende, nine. Maaş kartın da. Oyun başlasın!"),
        N("Seni gidi tahta kafa! Ben 1958'de minibüs kovaladım, sen kim oluyorsun!"),
        Tl("Nine bastonunu kaptı ve peşine düştü."),
      ];
      const ZONE_TALK = [ // one Kukla line and one Nine reply per zone, in ZONES order
        [K("Bodrumda ışık yok. Faturayı senin kartla ödedim."), N("Bir de fatura mı? Gel buraya, tahta kafa!")],
        [K("Burada herkes senin yaşında, saklanmak kolay."), N("Bingo gecesini kaçırıyorum, acele et!")],
        [K("Tansiyonunu ölçelim mi?"), N("Tansiyonum sana yeter!")],
        [K("Kıyma makinesi bugün indirimde."), N("Ben pazarlıkta ustayım!")],
        [K("Bilet almadın ama atlıkarınca bedava."), N("Midem bulanıyor, dişlerimi ver!")],
        [K("Kartının şifresi 1234 müymüş?"), N("Torunum değiştirdi, bilemezsin!")],
        [K("Dişlerini konveyöre koydum."), N("Onlar porselen, kırarsan yanarsın!")],
        [K("Dişlerin donmuş, gıcır gıcır."), N("Ben Erzurumluyum, soğuk vız gelir!")],
        [K("Son tren kaçtı nine."), N("65 yaş üstü ücretsiz, binerim!")],
        [K("Son perde... alkışlar!"), N("Alkış değil, şaplak geliyor!")],
      ];
      const STORY_END = [
        { who: "", text: "Nine dişlerini geri aldı ve kocaman gülümsedi.", art: "teeth" },
        N("Dişlerim! Kartım! Şimdi pazara gidiyorum."),
        K("...Devam filmi gelecek."),
      ];
      const storyEl = document.getElementById("story"), storyCard = document.getElementById("storyCard");
      document.getElementById("storyTvScreen").appendChild(tvEl.querySelector(".x-tv__screen svg").cloneNode(true));
      let story = null, storyAt = 0, storyT = 0;
      function storySeen() { try { return sessionStorage.getItem("nineStory") === "1"; } catch (_) { return !!window.nineStory; } }
      function markStory() { try { sessionStorage.setItem("nineStory", "1"); } catch (_) { window.nineStory = true; } }
      function playStory(panels, auto, done) {
        story = { panels, auto, done, i: 0 }; state = "story"; storyEl.hidden = false; renderStory();
      }
      function renderStory() {
        const s = story, pn = s.panels[s.i], art = pn.art || (pn.who === "kukla" ? "tv" : pn.who === "nine" ? "cane" : "");
        const who = document.getElementById("storyWho"), txt = document.getElementById("storyText");
        who.textContent = pn.who === "kukla" ? T("KUKLA · TV'DE") : pn.who === "nine" ? T("NİNE") : "";
        who.hidden = !pn.who; who.classList.toggle("is-nine", pn.who === "nine");
        const full = pn.who ? "“" + T(pn.text) + "”" : T(pn.text); txt.classList.toggle("is-told", !pn.who);
        clearTimeout(storyT);
        typeStory(txt, full);
        document.getElementById("storyArt").hidden = !art;
        document.getElementById("storyTv").hidden = art !== "tv";
        document.getElementById("storyCane").hidden = art !== "cane";
        document.getElementById("storyTeeth").hidden = art !== "teeth";
        document.getElementById("storyHint").textContent = T("Geçmek için dokun") + " · " + (s.i + 1) + "/" + s.panels.length;
        storyCard.classList.remove("is-in"); void storyCard.offsetWidth; storyCard.classList.add("is-in");
        if (pn.who === "kukla" && SFX.whisper) SFX.whisper();
        storyAt = performance.now();
      }
      // zone-intro auto-advance: counts only after the line is fully typed
      function armStory(len) {
        clearTimeout(storyT);
        if (state === "story" && story && story.auto) storyT = setTimeout(nextStory, Math.min(6000, Math.max(2500, len * 40)));
      }
      // typewriter: ~30 chars/sec; a tap while typing completes the line, the next tap advances
      let storyType = null;
      function typeStory(el, full) {
        stopType();
        const chars = Array.from(full);
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = full; armStory(chars.length); return; }
        let n = 0; el.textContent = "";
        storyType = { el, full, len: chars.length, id: setInterval(() => {
          el.textContent = chars.slice(0, ++n).join("");
          if (n >= chars.length) { stopType(); armStory(chars.length); }
        }, 33) };
      }
      function stopType() { if (storyType) { clearInterval(storyType.id); storyType.el.textContent = storyType.full; storyType = null; } }
      function nextStory() {
        if (state !== "story" || !story) return;
        stopType();
        clearTimeout(storyT);
        if (++story.i < story.panels.length) { renderStory(); return; }
        const done = story.done; story = null; storyEl.hidden = true; state = "play"; done();
      }
      const storyInput = (e) => { // a short guard so the tap that opened a card does not also skip it
        if (state !== "story" || (e && e.repeat) || performance.now() - storyAt < 250) return;
        if (storyType) { const len = storyType.len; stopType(); armStory(len); storyAt = performance.now(); return; }
        nextStory();
      };
      document.addEventListener("pointerdown", storyInput, true);
      addEventListener("keydown", storyInput, true);

      function showIntro(i) {
        clearTimeout(zoneT); zoneEl.hidden = true;
        if (i === 0 && !storySeen()) { markStory(); playStory(STORY_INTRO, false, () => showIntro(0)); return; }
        if (i % 5 !== 0) { showKukla(i); return; }
        const z = zoneOf(i); zoneLvl = i;
        document.getElementById("zoneTitle").textContent = T("MEKAN") + " " + (z + 1) + ": " + T(ZONES[z].name).toLocaleUpperCase(LANG);
        zoneEl.hidden = false; state = "zone";
        zoneT = setTimeout(endZone, 2000);
      }
      function endZone() {
        clearTimeout(zoneT); zoneEl.hidden = true;
        if (state === "zone") { state = "play"; playStory(ZONE_TALK[zoneOf(zoneLvl)], true, () => showKukla(zoneLvl)); }
      }
      document.addEventListener("pointerdown", () => { if (state === "zone") endZone(); }, true);
      addEventListener("keydown", () => { if (state === "zone") endZone(); }, true);

      function continueGame() { // saved level, from its checkpoint when the checkpoint belongs to it
        const sv = lsRead(), k = Math.min(TOTAL - 1, lsLast(sv)), cp = sv && sv.cp && sv.cp.lvl === k && typeof sv.cp.key === "string" ? sv.cp : null;
        startGame(k, cp);
      }
      function startGame(k, cp) {
        const inp = document.getElementById("codeIn"), v = inp ? inp.value.trim().toUpperCase() : ""; // KOD input removed from the menu
        if (inp) { inp.value = ""; inp.blur(); }
        if (k === undefined && !v) k = 0;
        if (k === undefined) { k = 0; for (let n = 1; n <= TOTAL; n++) if (codeOf(n) === v) k = n - 1; }
        levelIdx = k; if (!sdkLoaded) deaths = 0; cpActive = cp ? { lvl: k, key: cp.key } : null; // with a CrazyGames save the death count carries over
        document.getElementById("hudDeaths").textContent = T("Ölüm sayısı") + ": " + deaths;
        document.getElementById("startScreen").hidden = true; document.getElementById("endScreen").hidden = true;
        flashEl.classList.remove("is-on"); toast.classList.remove("is-on");
        bumpLast(); buildLevel(k); state = "play"; audioInit(); showIntro(k); lsSave();
      }

      /* ===== Bölüm Seç: levels reached this session; pauses the game while open ===== */
      const pickEl = document.getElementById("pickScreen"), pickGrid = document.getElementById("pickGrid");
      let pickPrev = "menu";
      function openPick() {
        if (state === "pause") return;
        if (state === "intro") endIntro();
        if (state === "zone") { clearTimeout(zoneT); zoneEl.hidden = true; state = "play"; }
        pickPrev = state; state = "pause";
        pickGrid.innerHTML = [...reached].sort((a, b) => a - b).map((k) => `<button data-k="${k}">${k + 1}</button>`).join("");
        pickEl.hidden = false;
      }
      function closePick() {
        pickEl.hidden = true;
        if (pickPrev === "dead") restart(); else state = pickPrev === "intro" ? "play" : pickPrev;
      }
      pickGrid.addEventListener("click", (e) => {
        const b = e.target.closest("button"); if (!b) return;
        const k = +b.dataset.k; pickEl.hidden = true;
        if (pickPrev === "menu" || pickPrev === "won") { if (isTouch) goLandscape(); startGame(k); return; }
        toast.classList.remove("is-on"); flashEl.classList.remove("is-on");
        levelIdx = k; cpActive = null; buildLevel(k); state = "play"; showIntro(k);
      });
      window.openPick = openPick;
      window.relang = () => { // refresh the HUD and the signs' text after a TR/EN switch
        langTex.forEach(({ c, draw, t }) => { const g = c.getContext("2d"); g.clearRect(0, 0, c.width, c.height); draw(g); t.needsUpdate = true; });
        for (const z in zoneTexCache) if (+z !== 0) { zoneTexCache[z].dispose(); delete zoneTexCache[z]; } // zone walls carry signs (SİRK, NİNE DURAĞI)
        if (zoneIdx > 0) { const z = zoneIdx; zoneIdx = -1; applyZone(z); }
        const nm = NAMES[levelIdx];
        document.getElementById("hudLevel").textContent = T("Bölüm") + " " + (levelIdx + 1) + "/" + TOTAL + (nm ? " · " + T(nm) : "");
        document.getElementById("hudZone").textContent = T(ZONES[Math.max(0, zoneIdx)].name);
        document.getElementById("hudDeaths").textContent = T("Ölüm sayısı") + ": " + deaths;
      };
      window.relang();
      document.getElementById("pickClose").addEventListener("click", closePick);

      function win() {
        // BGX2 site: level-complete hook for ads.js (Ad Placement API); pause/resume freeze game + audio during an ad
        try { if (window.bgxLevelComplete) window.bgxLevelComplete(levelIdx + 1, {
          pause: function () { if (state !== "pause") { window.__bgxPrev = state; state = "pause"; } if (AC && AC.state === "running") AC.suspend(); },
          resume: function () { if (state === "pause" && window.__bgxPrev) { state = window.__bgxPrev; window.__bgxPrev = null; } if (AC && AC.state === "suspended") AC.resume(); } }); } catch (_) {}
        if (sawGain) sawGain.gain.value = 0;
        if (levelIdx < TOTAL - 1) { levelIdx++; bumpLast(); buildLevel(levelIdx); lsSave(); showIntro(levelIdx); return; }
        playStory(STORY_END, false, () => {
          state = "won";
          document.getElementById("endDeaths").textContent = deaths + " " + T("ölüm");
          document.getElementById("endScreen").hidden = false;
          document.getElementById("againBtn").focus();
        });
      }


      /* ===== Tiny AABB physics against the tile grid ===== */
      function moveX(dt) {
        p.x += p.vx * dt;
        const y0 = Math.floor(p.y - HH + 0.01), y1 = Math.floor(p.y + HH - 0.01);
        if (p.vx > 0) { const cx = Math.floor(p.x + HW); for (let y = y0; y <= y1; y++) if (solid(cx, y)) { p.x = cx - HW - 0.001; p.vx = 0; p.mvx = 0; if (tile(cx, y) === "1") bonkMirror(cx, y, 1); break; } }
        else if (p.vx < 0) { const cx = Math.floor(p.x - HW); for (let y = y0; y <= y1; y++) if (solid(cx, y)) { p.x = cx + 1 + HW + 0.001; p.vx = 0; p.mvx = 0; if (tile(cx, y) === "1") bonkMirror(cx, y, -1); break; } }
        p.x = Math.max(HW, Math.min(W - HW, p.x));
        // walking into a container pushes it, until it hits a wall
        for (const c of crates) if (overlap(p.x, p.y, HW, HH, c.x, c.y, c.hw, c.hh)) {
          if (p.x < c.x) { pushCrate(c, p.x + HW - (c.x - c.hw)); p.x = c.x - c.hw - HW - 0.001; }
          else { pushCrate(c, p.x - HW - (c.x + c.hw)); p.x = c.x + c.hw + HW + 0.001; }
          p.mvx = 0;
        }
      }
      function pushCrate(c, dx) {
        c.x += dx;
        const y0 = Math.floor(c.y - c.hh + 0.01), y1 = Math.floor(c.y + c.hh - 0.01);
        const cx = Math.floor(dx > 0 ? c.x + c.hw : c.x - c.hw);
        for (let y = y0; y <= y1; y++) if (solid(cx, y)) { c.x = dx > 0 ? cx - c.hw - 0.001 : cx + 1 + c.hw + 0.001; break; }
        c.mesh.position.x = c.x;
      }
      function moveY(dt) {
        const py = p.y;
        p.y += p.vy * dt; p.onGround = false;
        const x0 = Math.floor(p.x - HW + 0.01), x1 = Math.floor(p.x + HW - 0.01);
        if (p.vy <= 0) {
          const cy = Math.floor(p.y - HH);
          for (let x = x0; x <= x1; x++) if (solid(x, cy)) {
            p.y = cy + 1 + HH; p.vy = 0; p.onGround = true;
            const f = fakes[x + "," + cy]; if (f && f.timer < 0) { f.timer = f.delay; if (f.delay > 0.3) SFX.creak(); } // fake ground / pit rim starts to crumble
          }
        } else {
          const cy = Math.floor(p.y + HH);
          for (let x = x0; x <= x1; x++) if (solid(x, cy)) { p.y = cy - HH - 0.001; p.vy = 0; break; }
        }
        // stand on containers, bump heads under them
        for (const c of crates) if (overlap(p.x, p.y, HW, HH, c.x, c.y, c.hw, c.hh)) {
          if (p.vy <= 0 && py - HH >= c.y + c.hh - 0.05) { p.y = c.y + c.hh + HH + 0.001; p.vy = 0; p.onGround = true; }
          else if (p.vy > 0 && py + HH <= c.y - c.hh + 0.05) { p.y = c.y - c.hh - HH - 0.001; p.vy = 0; }
        }
        // land on chain platforms from above; a drop platform starts its 0.5 s fuse
        p.plat = null;
        for (const pl of plats) {
          const top = pl.y + 0.15;
          if (!pl.fallen && p.vy <= 0 && Math.abs(p.x - pl.x) < 1 + HW && py - HH >= top - 0.15 && p.y - HH <= top) {
            p.y = top + HH; p.vy = 0; p.onGround = true; p.plat = pl;
            if (pl.t === "_" && pl.drop === null) pl.drop = 0.5;
            if (pl.t === "B" && pl.drop === null) pl.drop = 1;
          }
        }
        // stand on a stretcher's mattress from above; it carries her along
        p.gurney = null;
        for (const s of gurneys) {
          const top = s.y + 0.75;
          if (p.vy <= 0 && Math.abs(p.x - s.x) < 0.8 + HW && py - HH >= top - 0.15 && p.y - HH <= top) {
            p.y = top + HH; p.vy = 0; p.onGround = true; p.gurney = s;
          }
        }
        // ride a ferris-wheel cabin from above; the rigged one starts its 0.6 s fuse
        p.cab = null;
        for (const cb of cabins) {
          const top = cb.y;
          if (!cb.fallen && p.vy <= 0 && Math.abs(p.x - cb.x) < 0.45 + HW && py - HH >= top - 0.15 && p.y - HH <= top) {
            p.y = top + HH; p.vy = 0; p.onGround = true; p.cab = cb;
            if (cb.rig && cb.drop === null) { cb.drop = 0.6; SFX.creak(); }
          }
        }
      }

      /* ===== Update: player ===== */
      function updatePlayer(dt) {
        const left = keys.KeyA || keys.ArrowLeft || touch.left, right = keys.KeyD || keys.ArrowRight || touch.right;
        const jumpHeld = JUMP_KEYS.some((k) => keys[k]) || touch.jump || joyJump;
        const input = ((right ? 1 : 0) - (left ? 1 : 0)) * (mod === "rev" ? -1 : 1);
        p.ropeCD -= dt;
        if (p.rope) { swing(dt, input); return; }
        // rope momentum carries through the air, gone on landing
        const prevVx = p.vx;
        if (p.onGround) p.mvx = 0; else p.mvx *= Math.pow(0.5, dt);
        p.vx = Math.max(-11, Math.min(11, input * SPEED + p.mvx));
        // Buz Zemin: momentum carries; speeding up, turning and stopping all happen at 10% of normal friction
        const ice = p.onGround && tile(Math.floor(p.x), Math.floor(p.y - HH + 0.05)) === "&";
        if (ice) {
          if (!p.ice) p.iceV = Math.max(-8, Math.min(8, prevVx));
          const d = input * SPEED - p.iceV;
          p.iceV += Math.sign(d) * Math.min(Math.abs(d), ICE_FRIC * dt);
          p.vx = p.iceV; p.mvx = p.iceV - input * SPEED; // carries into a jump
          if (Math.abs(p.iceV) > 2 && Math.random() < dt * 5) dust(p.x, p.y - HH, 1, -Math.sign(p.iceV));
        }
        p.ice = ice;
        // Islak Zemin: on wet tiles almost no friction; she keeps sliding and cannot stop
        const wet = p.onGround && tile(Math.floor(p.x), Math.floor(p.y - HH + 0.05)) === "w";
        if (wet) {
          if (!p.wet) p.slideV = (Math.abs(p.vx) > 1 ? Math.sign(p.vx) : p.face) * Math.max(4.5, Math.abs(p.vx));
          p.slideV = Math.max(-8, Math.min(8, p.slideV + input * 2.5 * dt));
          if (Math.abs(p.slideV) < 4) p.slideV = (Math.sign(p.slideV) || p.face) * 4;
          p.vx = p.slideV; p.mvx = p.slideV - input * SPEED; // carries into a jump
          if (Math.random() < dt * 8) dust(p.x, p.y - HH, 1, -Math.sign(p.slideV));
        }
        p.wet = wet;
        // Ketçaplı Zemin: slides like the wet floor, but always toward the nearby hazard; input only changes the speed
        const fk = Math.floor(p.x) + "," + Math.floor(p.y - HH + 0.05), ketch = p.onGround && slideDirs[fk] !== undefined;
        if (ketch) {
          const d = slideDirs[fk];
          if (!p.ketch) p.slideV = d * Math.max(4.5, Math.abs(p.vx));
          p.slideV = d * Math.max(4, Math.min(8, Math.abs(p.slideV) + input * d * 2.5 * dt));
          p.vx = p.slideV; p.mvx = p.slideV - input * SPEED;
          if (Math.random() < dt * 8) dust(p.x, p.y - HH, 1, -d);
        }
        p.ketch = ketch;
        // Konveyör Bant: carries her 3 tiles/s toward the hazard; walking against it is slow
        if (p.onGround && beltDirs[fk] !== undefined) p.vx += beltDirs[fk] * 3;
        // Donduran Fan: icy wind pushes her 4 tiles/s while it blows (set by updateBuzhane)
        if (windPush) p.vx += windPush;
        // Pamuk Şeker Bulutu: sticky; 30% speed for as long as she is inside the cloud
        p.bonkT -= dt;
        const candy = tile(Math.floor(p.x), Math.floor(p.y - HH + 0.05)) === "p" || tile(Math.floor(p.x), Math.floor(p.y)) === "p";
        if (candy) { p.vx *= 0.3; p.mvx *= 0.3; if (!p.candy) tone("sine", 320, 180, 0.12, 0.06); if (input && Math.random() < dt * 6) dust(p.x, p.y - HH, 1, -input); }
        p.candy = candy;
        // Kayan Halı: flung backward, input ignored until she lands the throw
        if (p.fling > 0) { p.fling -= dt; p.vx = p.flingV; p.mvx = 0; }
        if (input && input !== p.face && p.onGround && !wet && !ketch && !ice) dust(p.x, p.y - HH, 4, -input); // turn while running
        if (input) p.face = input;
        p.coyote = p.onGround ? 0.1 : p.coyote - dt; // coyote time
        p.buf = jumpPressed ? 0.12 : p.buf - dt; // jump buffer
        if (p.buf > 0 && p.coyote > 0) {
          p.vy = JUMP; p.coyote = 0; p.buf = 0; p.jumping = true; p.ss = 0.3; p.ssV = 0;
          SFX.jump(); dust(p.x, p.y - HH, 5, 0);
        }
        if (p.jumping && !jumpHeld && p.vy > 0) { p.vy *= 0.45; p.jumping = false; } // released early: shorter jump
        if (p.vy <= 0) p.jumping = false;
        p.vy = Math.max(p.vy - GRAV * (p.vy < 0 ? 1.2 : 1) * dt, -20); // fall a bit faster than rise
        const wasG = p.onGround, fallV = p.vy;
        moveX(dt); if (ice && p.vx === 0) p.iceV = 0; // hit a wall on the ice
        moveY(dt);
        if (p.onGround && !wasG && fallV < -4) { // landing
          const k = Math.min(1, (-fallV - 4) / 14);
          p.ss = -0.12 - 0.22 * k; p.ssV = 0; wobT = 0.6; SFX.land(k); dust(p.x, p.y - HH, 4 + Math.round(k * 5), 0);
          if (fallV < -16) shakeT = Math.max(shakeT, 0.18); // hard landing
        }
        if (!p.onGround && p.ropeCD <= 0) grabRope();
        if (p.y < 0.4) die("fall");
      }

      /* ===== Rope swings: auto-grab in the air, ◀ ▶ pump, jump releases ===== */
      const HAND = 0.82; // hands above the feet when reaching up
      function grabRope() {
        const hx = p.x, hy = p.y - HH + HAND;
        for (const r of ropes) {
          if (r.snapped) continue;
          const tx = Math.sin(r.th), ty = -Math.cos(r.th);
          const t = Math.max(0.35 * r.len, Math.min(r.len, (hx - r.x) * tx + (hy - r.y) * ty));
          if (Math.hypot(r.x + tx * t - hx, r.y + ty * t - hy) > 0.45) continue;
          r.hold = Math.max(1.2, Math.min(r.len, Math.hypot(hx - r.x, hy - r.y)));
          r.th = Math.atan2(hx - r.x, r.y - hy);
          r.w = (p.vx * Math.cos(r.th) + p.vy * Math.sin(r.th)) / r.hold;
          r.held = true; r.lastSign = Math.sign(r.th) || 1; p.rope = r; p.mvx = 0; p.jumping = false; SFX.rope();
          placeOnRope(); return;
        }
      }
      function placeOnRope() {
        const r = p.rope, s = Math.sin(r.th), c = Math.cos(r.th);
        p.x = r.x + r.hold * s; p.y = r.y - r.hold * c - HAND + HH;
        p.vx = r.hold * r.w * c; p.vy = r.hold * r.w * s; p.onGround = false;
      }
      function swing(dt, input) {
        const r = p.rope;
        r.w += (-(GRAV * 0.6 / r.hold) * Math.sin(r.th) + (input * 7) / r.hold) * dt;
        r.w *= 1 - 0.12 * dt;
        r.th += r.w * dt;
        if (Math.abs(r.th) > 1.35) { r.th = Math.sign(r.th) * 1.35; r.w *= -0.2; }
        const sg = Math.sign(r.th);
        if (sg && sg !== r.lastSign) { r.lastSign = sg; r.swings++; } // one pass through the bottom = one swing
        placeOnRope();
        if (input) p.face = input;
        if (jumpPressed) { r.held = false; p.rope = null; p.ropeCD = 0.35; p.vy = Math.max(p.vy, 0) + 8; p.mvx = p.vx; p.coyote = 0; p.buf = 0; p.ss = 0.25; SFX.jump(); return; }
        if (r.snaps && r.swings >= 2) { // worn rope gives way on the second swing
          r.snapped = true; r.held = false; r.vy = 0; p.rope = null; p.ropeCD = 0.5; p.mvx = p.vx;
          level.add(box(0.07, 0.4, MAT.rope, r.x, r.y - 0.2, 1.8));
          r.mesh.position.y -= 0.4;
        }
      }
      function updateRopes(dt) {
        for (const r of ropes) {
          if (r.snapped) { r.vy -= GRAV * dt; r.mesh.position.y += r.vy * dt; r.mesh.rotation.z += r.w * dt; continue; }
          if (!r.held) { r.w += -(GRAV * 0.6 / r.len) * Math.sin(r.th) * dt; r.w *= 1 - 0.08 * dt; r.th += r.w * dt; }
          r.mesh.rotation.z = r.th;
        }
      }

      /* ===== Update: traps ===== */
      function updateTraps(dt) {
        // Fake ground collapse
        for (const k in fakes) {
          const f = fakes[k];
          if (f.timer > 0) { f.timer -= dt; f.mesh.position.x += Math.sin(performance.now() / 20) * 0.01; if (f.timer <= 0) f.fallen = true; }
          if (f.fallen) { f.vy -= GRAV * dt; f.mesh.position.y += f.vy * dt; f.mesh.rotation.z += dt * 0.6; }
        }
        // Ceiling spikes: drop when the player walks underneath
        for (const s of spikes) {
          if (s.state === "idle" && state === "play" && p.y < s.y) {
            // nearest spike of the cluster, horizontally
            let dx = s.x - p.x;
            for (const q of s.cl) if (Math.abs(q.x - p.x) < Math.abs(dx)) dx = q.x - p.x;
            // bait timing: only when approaching and the front edge is within 0.9 tiles of the nearest spike, or already under it
            const side = Math.sign(dx), toward = side !== 0 && Math.abs(p.vx) > 0.1 && Math.sign(p.vx) === side;
            if (Math.abs(dx) < 0.5 || (toward && Math.abs(dx) - HW <= 0.9)) {
              // a quick 0.08 s shake, then they let go one by one, 0.08 s apart, along the player's direction
              const d = Math.sign(p.vx) || p.face || 1;
              s.cl.slice().sort((a, b) => (a.x - b.x) * d).forEach((q, k) => { if (q.state === "idle") { q.state = "warn"; q.warn = 0.08 + k * 0.08; q.grit = 0; } });
              shakeT = Math.max(shakeT, 0.08);
              SFX.creak();
            }
          }
          if (s.state === "warn") { // shake, shed grit, then let go
            s.warn -= dt; s.grit -= dt;
            s.mesh.position.x = s.x + Math.sin(s.warn * 70) * 0.06;
            if (s.grit <= 0) {
              s.grit = 0.09;
              const g = box(rnd(0.03, 0.06), rnd(0.03, 0.06), new THREE.MeshBasicMaterial({ color: 0x8a837a, transparent: true, opacity: 0.75 }));
              g.position.set(s.x + rnd(-0.3, 0.3), s.y + rnd(0.1, 0.45), 0);
              addBit(g, { vx: rnd(-0.3, 0.3), vy: 0, g: GRAV * 0.5, spin: rnd(-6, 6), life: 0.7, fade: true, z: 2.3 });
            }
            if (s.warn <= 0) { s.state = "fall"; s.vy = -10; s.mesh.position.x = s.x; }
          }
          if (s.state === "fall") {
            s.vy -= 120 * dt; s.y += s.vy * dt;
            if (solid(Math.floor(s.x), Math.floor(s.y - 0.4))) { s.state = "stuck"; s.life = 0.6; }
          }
          if (s.state === "stuck") { s.life -= dt; s.mesh.scale.setScalar(Math.max(0.01, s.life / 0.6)); if (s.life <= 0) s.state = "gone"; }
          s.mesh.position.y = s.y;
          if ((s.state === "idle" || s.state === "warn" || s.state === "fall") && overlap(p.x, p.y, HW, HH, s.x, s.y - 0.05, 0.22, 0.38)) die("spike");
        }
        // Arrow triggers: invisible tiles fire nearby hidden wall launchers
        for (const t of triggers) {
          if (!t.used && Math.abs(p.x - t.x) < 0.5) {
            t.used = true;
            for (const l of launchers) if (Math.abs(l.x - t.x) <= ARROW_RANGE) {
              const dir = Math.sign(t.x - l.x) || 1, a = new THREE.Group();
              a.add(box(0.7, 0.06, MAT.arrow)); a.add(tri([0.35, 0.1, 0.52, 0, 0.35, -0.1], MAT.arrowTip, 0.01));
              a.add(tri([-0.35, 0.03, -0.45, 0.12, -0.25, 0.03], MAT.flag, 0.01)); a.add(tri([-0.35, -0.03, -0.45, -0.12, -0.25, -0.03], MAT.flag, 0.01));
              a.scale.x = dir; a.position.set(l.x + dir * 0.7, l.y, 1.5); level.add(a);
              arrows.push({ x: l.x + dir * 0.7, y: l.y, vx: dir * ARROW_SPEED, dist: 0, mesh: a });
            }
          }
        }
        // Arrows fly until they hit a wall or go too far
        for (let i = arrows.length - 1; i >= 0; i--) {
          const a = arrows[i]; a.x += a.vx * dt; a.dist += Math.abs(a.vx * dt); a.mesh.position.x = a.x;
          if (crates.some((c) => overlap(a.x, a.y, 0.4, 0.08, c.x, c.y, c.hw, c.hh))) { level.remove(a.mesh); arrows.splice(i, 1); continue; } // container blocks it
          if (state === "play" && overlap(p.x, p.y, HW, HH, a.x, a.y, 0.4, 0.08)) die("arrow", Math.sign(a.vx));
          if (solid(Math.floor(a.x + Math.sign(a.vx) * 0.5), Math.floor(a.y)) || a.dist > 30) { level.remove(a.mesh); arrows.splice(i, 1); }
        }
        // TNT barrels explode on touch
        for (const b of barrels) if (b.live && state === "play" && overlap(p.x, p.y, HW, HH, b.x, b.y, 0.33, 0.4)) {
          b.live = false; b.mesh.visible = false;
          const e = new THREE.Group(); e.add(circle(0.6, MAT.fire)); e.add(circle(0.35, MAT.fire2, 0, 0, 0.01));
          e.position.set(b.x, b.y, 3); level.add(e); fx.push({ mesh: e, t: 0 });
          die("boom");
        }
        // Explosion effect
        for (const f of fx) { f.t += dt; f.mesh.scale.setScalar(1 + f.t * 6); MAT.fire.opacity = MAT.fire2.opacity = Math.max(0, 1 - f.t * 1.6); }
        // Containers fall onto the ground
        for (const c of crates) {
          c.vy = Math.max(c.vy - GRAV * dt, -20); c.y += c.vy * dt;
          const cy = Math.floor(c.y - c.hh);
          for (let x = Math.floor(c.x - c.hw + 0.01); x <= Math.floor(c.x + c.hw - 0.01); x++) if (solid(x, cy)) { c.y = cy + 1 + c.hh; c.vy = 0; break; }
          c.mesh.position.y = c.y;
        }
        // Stone ball: waits until you run ahead, then rolls after you and squashes
        for (const b of balls) {
          if (b.st === "wait") { if (p.x > b.x + 4.5) b.st = "roll"; else continue; }
          if (b.st === "sink") { b.y -= 0.6 * dt; b.vx *= 0.9; }
          else {
            b.vx = Math.min(5.4, b.vx + 7 * dt); b.x += b.vx * dt;
            const fx2 = Math.floor(b.x + b.r);
            if (solid(fx2, Math.floor(b.y))) { b.x = fx2 - b.r; b.vx = 0; }
            b.vy -= GRAV * dt; b.y += b.vy * dt;
            const cy = Math.floor(b.y - b.r);
            if (solid(Math.floor(b.x), cy)) { if (b.vy < -6) shakeT = Math.max(shakeT, 0.12); b.y = cy + 1 + b.r; b.vy = 0; }
            if ("~5".includes(tile(Math.floor(b.x), cy))) b.st = "sink";
            if (state === "play" && overlap(p.x, p.y, HW, HH, b.x, b.y, b.r * 0.8, b.r * 0.8)) die("squash");
          }
          b.mesh.position.set(b.x, b.y, b.st === "sink" ? 0.2 : 1.9); b.mesh.rotation.z -= (b.vx * dt) / b.r;
        }
        // Chain platforms: slide, ride up and down, or fall 0.5 s after being stepped on; they carry the player
        lt += dt;
        for (const pl of plats) {
          const ox = pl.x, oy = pl.y;
          let jig = 0;
          if (pl.t === "=") pl.x = pl.bx + 2 * Math.sin(lt * 1.3 + pl.ph);
          else if (pl.t === "^") pl.y = pl.by + 0.6 + 0.9 * Math.sin(lt * 1.3 + pl.ph); // stays above the water
          else if (pl.drop !== null && !pl.fallen) { pl.drop -= dt; jig = Math.sin(lt * 60) * 0.04; if (pl.drop <= 0) pl.fallen = true; }
          if (pl.fallen) { pl.vy -= GRAV * dt; pl.y += pl.vy * dt; if (p.plat === pl) p.plat = null; }
          if (state === "play" && p.plat === pl) { p.x += pl.x - ox; p.y += pl.y - oy; }
          pl.mesh.position.set(pl.x + jig, pl.y, 1.3);
        }
        // Saws spin; Z slides on its rail, z pops out of the ground when you get close
        let near = 99;
        for (const s of saws) {
          near = Math.min(near, Math.hypot(p.x - s.x, p.y - s.y));
          if (s.t === "Z") s.x = s.bx + 2.5 * Math.sin(lt * 2 + s.ph);
          if (!s.up && state === "play" && Math.abs(p.x - s.x) < 2.2) s.up = true;
          if (s.up) s.y = Math.min(s.hy, s.y + 8 * dt);
          s.mesh.position.x = s.x; s.mesh.position.y = s.y; s.mesh.rotation.z -= 14 * dt;
          const qx = Math.max(p.x - HW, Math.min(p.x + HW, s.x)), qy = Math.max(p.y - HH, Math.min(p.y + HH, s.y));
          if (state === "play" && Math.hypot(qx - s.x, qy - s.y) < s.r * 0.8) die("saw", Math.sign(p.x - s.x) || 1);
        }
        // Ayı Kapanı: stepping on it snaps the jaws shut with a clank (jump over it to pass)
        for (const b of bears) {
          if (!b.shut && state === "play" && overlap(p.x, p.y, HW, HH, b.x, b.y + 0.08, 0.3, 0.08)) { b.shut = true; p.x = b.x; SFX.click(); SFX.bang(); die("squash"); }
          if (b.shut) b.jaws.forEach((j) => (j.m.rotation.z += (j.to - j.m.rotation.z) * Math.min(1, dt * 30)));
        }
        // Sarkaç: the blade swings across the path; touching it cuts you in two
        for (const s of blades) {
          s.a = 0.75 * Math.sin(lt * (Math.PI * 2 / 2.4) + s.ph); s.mesh.rotation.z = s.a; // 0.75 rad, 2.4 s period
          const sn = Math.sin(s.a), cs = Math.cos(s.a), rc = s.L + 0.16; // middle of the blade band at its lowest point
          const bx = s.x + rc * sn, by = s.py - rc * cs;
          near = Math.min(near, Math.hypot(p.x - bx, p.y - by));
          // whoosh each time it passes the bottom
          const sg = Math.sign(s.a);
          if (s.sg && sg && sg !== s.sg) { const k = 1 - Math.hypot(p.x - bx, p.y - by) / 10; if (k > 0) SFX.whoosh(k); }
          if (sg) s.sg = sg;
          // five hit points spread along the blade's width (along the swing tangent), lifted to follow the crescent's curve
          if (state === "play") for (const o of [-1, -0.5, 0, 0.5, 1]) {
            const lift = 0.35 * o * o, hx = bx + o * cs - lift * sn, hy = by + o * sn + lift * cs;
            const qx = Math.max(p.x - HW, Math.min(p.x + HW, hx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, hy));
            if (Math.hypot(qx - hx, qy - hy) < 0.45) { die("saw", Math.sign(p.x - hx) || 1); break; }
          }
        }
        if (sawGain) sawGain.gain.setTargetAtTime(Math.pow(Math.max(0, 1 - near / 7), 2) * 0.16, AC.currentTime, 0.08);
        // danger for the heartbeat: nearest saw, crusher, or crusher trap still waiting
        danger = near;
        for (const c of crushers) danger = Math.min(danger, Math.hypot(p.x - c.x, p.y - c.y));
        for (const s of surprises) if (s.t === "e" && !s.used) danger = Math.min(danger, Math.abs(p.x - s.x) + 1);
        // Dikenli Duvarlar: stepping in starts the walls grinding inward; caught between them when they meet = squash
        for (const w of spikeWalls) {
          if (w.t < 0) { if (state === "play" && Math.abs(p.x - w.x) < 0.5) { w.t = 0; SFX.click(); } else continue; }
          if (w.shut) continue;
          w.t = Math.min(1.8, w.t + dt);
          const k = w.t / 1.8, e = k * k * (3 - 2 * k), lx = w.m - 3 + 3 * e, rx = w.m + 3 - 3 * e;
          w.walls[0].position.x = lx; w.walls[1].position.x = rx;
          danger = Math.min(danger, Math.abs(p.x - w.m));
          w.gr -= dt;
          if (w.gr <= 0) { w.gr = 0.14; noise(0.18, "bandpass", 700, 300, 0.35); tone("sawtooth", 62, 48, 0.16, 0.08); shakeT = Math.max(shakeT, 0.06); }
          if (state === "play" && rx - lx < 2 * HW + 0.6 && p.x + HW > lx && p.x - HW < rx && p.y - HH < w.by + 2.6) { p.x = w.m; SFX.bang(); die("squash"); }
          if (w.t >= 1.8) { w.shut = true; SFX.bang(); shakeT = Math.max(shakeT, 0.35); buzz(90); }
        }
        updateHuzurevi(dt);
        updateHastane(dt);
        updateKasap(dt);
        updateLunapark(dt);
        updateKanal(dt);
        updateFabrika(dt);
        updateBuzhane(dt);
        updateMetro(dt);
        updateStudyo(dt);
        updateBodrum(dt);
        updateSurprises(dt);
        updateCheckpoints(dt);
        updateBoss(dt);
        // Water pits
        if (state === "play") {
          const cx = Math.floor(p.x), cy = Math.floor(p.y - HH + 0.25);
          if ("~5".includes(tile(cx, cy))) die("water");
        }
        // Flag (final level: it runs 5 tiles ahead once when you get close)
        if (flag && flag.runs && !flag.ran && state === "play" && p.x > flag.x - 3) { flag.ran = true; flag.tx = flag.x + 5; }
        if (flag && flag.x < flag.tx) { flag.x = Math.min(flag.tx, flag.x + 9 * dt); flag.mesh.position.x = flag.x; flag.mesh.rotation.z = Math.sin(lt * 30) * 0.08; }
        else if (flag) flag.mesh.rotation.z = 0;
        if (state === "play" && flag && !flag.locked && overlap(p.x, p.y, HW, HH, flag.x + 0.2, flag.y, 0.3, 1.3)) win();
      }

      /* ===== Update: Huzurevi traps ===== */
      // gravity, floor, walls and water for things rolling or hopping on the floor (o.y is the bottom)
      function floorPhys(o, hw, dt) {
        o.vy = Math.max(o.vy - GRAV * dt, -20); o.y += o.vy * dt; o.ground = false;
        const fy = Math.floor(o.y - 0.01);
        if (o.vy <= 0 && solid(Math.floor(o.x), fy)) { o.y = fy + 1; o.vy = 0; o.ground = true; }
        o.x += o.vx * dt;
        const sx = Math.sign(o.vx);
        if (sx && solid(Math.floor(o.x + sx * hw), Math.floor(o.y + 0.2))) { o.x = sx > 0 ? Math.floor(o.x + hw) - hw - 0.01 : Math.floor(o.x - hw) + 1 + hw + 0.01; o.vx = 0; return "wall"; }
        if ("~5".includes(tile(Math.floor(o.x), Math.floor(o.y + 0.1)))) return "water";
        return o.y < -3 ? "gone" : "";
      }
      const onScreen = (x) => Math.abs(x - camX) < viewW / 2 + 1;
      // Düşen Tavan Vantilatörü (fan) and Düşen Tabela (sign): directly below, a short wobble/creak tell, then it drops (squash)
      function updateDroppers(kind, dt) {
        const play = state === "play";
        for (const s of droppers) {
          if (s.kind !== kind) continue;
          if (s.bl && s.st !== "down") s.bl.scale.x = Math.cos(lt * (s.st === "fall" ? 8 : 14));
          if (s.st === "wait") {
            if (play && Math.abs(p.x - s.x) < 0.45 && p.y < s.py) { s.st = "tell"; s.t = 0; SFX.creak(); }
          } else if (s.st === "tell") {
            s.t += dt;
            s.mesh.rotation.z = Math.sin(s.t * (kind === "fan" ? 55 : 30)) * (kind === "fan" ? 0.14 : 0.08);
            if (kind === "sign" && Math.random() < dt * 25 && onScreen(s.x)) tone("square", 260 + Math.random() * 80, 190, 0.05, 0.03);
            if (s.t >= s.tell) {
              s.st = "fall"; s.vy = 0;
              if (onScreen(s.x)) noise(0.12, "highpass", 3000, 1500, 0.2); // it tears loose
            }
          } else if (s.st === "fall") {
            s.vy -= GRAV * 1.3 * dt; s.py += s.vy * dt; s.mesh.rotation.z *= 0.9;
            if (s.py - s.bot <= s.y) {
              s.py = s.y + s.bot; s.st = "down"; s.mesh.rotation.z = kind === "sign" ? 0.12 : 0;
              if (onScreen(s.x)) { SFX.crash(); shakeT = Math.max(shakeT, 0.15); dust(s.x, s.y, 6, 0); }
            }
            s.mesh.position.y = s.py;
            if (play && overlap(p.x, p.y, HW, HH, s.x, s.py - s.bot + s.hh, s.hw, s.hh)) { SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("squash"); }
          }
        }
      }
      function updateHuzurevi(dt) {
        const play = state === "play";
        updateDroppers("fan", dt);
        // Tekerlekli Sandalye: rolls at you, squeaking, once you are within 5 tiles
        for (const c of chairs) {
          if (c.st === "wait") {
            if (play && Math.abs(p.x - c.x) < 5 && Math.abs(p.y - HH - c.y) < 1.5) { c.st = "roll"; c.dir = Math.sign(p.x - c.x) || -1; c.mesh.scale.x = c.dir; SFX.squeak(); }
            else continue;
          }
          if (c.st === "roll") {
            c.vx = c.dir * Math.min(8.5, Math.abs(c.vx) + 16 * dt);
            const r = floorPhys(c, 0.38, dt); c.dist += Math.abs(c.vx * dt);
            c.sq -= dt; if (c.sq <= 0) { c.sq = 0.22; if (onScreen(c.x)) SFX.squeak(); }
            c.mesh.userData.wheel.rotation.z -= (Math.abs(c.vx) * dt) / 0.3;
            if (play && overlap(p.x, p.y, HW, HH, c.x, c.y + 0.45, 0.36, 0.45)) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", c.dir); }
            if (r === "wall") { c.st = "stop"; SFX.bang(); if (onScreen(c.x)) shakeT = Math.max(shakeT, 0.1); c.mesh.rotation.z = c.dir * 0.25; }
            else if (r === "water") c.st = "sink";
            else if (r === "gone" || c.dist > 40) { c.st = "stop"; c.mesh.visible = false; }
          } else if (c.st === "sink") { c.y -= 0.6 * dt; c.mesh.position.z = 0.2; if (c.y < -2) c.st = "stop"; }
          c.mesh.position.x = c.x; c.mesh.position.y = c.y;
        }
        // Şakırdayan Takma Diş: hops toward you, chattering; jump it, it can fall into water and pits
        for (const t of chompers) {
          if (t.st === "wait") { if (play && Math.abs(p.x - t.x) < 8 && Math.abs(p.y - HH - t.y) < 2) t.st = "hop"; else continue; }
          if (t.st === "hop") {
            if (t.ground) { t.vx = 0; t.hop -= dt; if (t.hop <= 0) { t.dir = Math.sign(p.x - t.x) || t.dir; t.vx = t.dir * 3.2; t.vy = 6; t.hop = 0.12; t.mesh.scale.x = t.dir; if (onScreen(t.x)) SFX.chatter(); } }
            const r = floorPhys(t, 0.22, dt);
            t.mesh.userData.up.rotation.z = Math.abs(Math.sin(lt * 38)) * 0.55;
            if (play && overlap(p.x, p.y, HW, HH, t.x, t.y + 0.15, 0.22, 0.16)) { SFX.click(); die("spike"); }
            if (r === "water") { t.st = "sink"; if (onScreen(t.x)) SFX.splash(); }
            else if (r === "gone") { t.st = "gone"; t.mesh.visible = false; }
          } else if (t.st === "sink") { t.y -= 0.8 * dt; t.mesh.position.z = 0.2; if (t.y < -2) { t.st = "gone"; t.mesh.visible = false; } }
          t.mesh.position.x = t.x; t.mesh.position.y = t.y;
        }
        // Örgü Şişi: the basket jiggles for 0.35 s, then a needle shoots out toward you; every 1.6 s
        for (const b of baskets) {
          b.t -= dt;
          b.b.position.x = b.t < 0.35 ? Math.sin(b.t * 90) * 0.04 : 0;
          if (b.t <= 0) {
            b.t = 1.6;
            if (Math.abs(p.x - b.x) > 14) continue;
            const dir = Math.sign(p.x - b.x) || -1, m = needleMesh();
            m.scale.x = dir; m.position.set(b.x + dir * 0.3, b.y, 1.5); level.add(m);
            needles.push({ x: b.x + dir * 0.3, y: b.y, vx: dir * 7, dist: 0, mesh: m });
            if (onScreen(b.x)) SFX.needle();
          }
        }
        for (let i = needles.length - 1; i >= 0; i--) {
          const a = needles[i]; a.x += a.vx * dt; a.dist += Math.abs(a.vx * dt); a.mesh.position.x = a.x;
          if (play && overlap(p.x, p.y, HW, HH, a.x, a.y, 0.4, 0.04)) die("arrow", Math.sign(a.vx));
          if (crates.some((c) => overlap(a.x, a.y, 0.4, 0.04, c.x, c.y, c.hw, c.hh)) || solid(Math.floor(a.x + Math.sign(a.vx) * 0.45), Math.floor(a.y)) || a.dist > 14) { level.remove(a.mesh); needles.splice(i, 1); }
        }
        // Düşen Saksı: within 2 tiles it wobbles 0.25 s on the ledge, then drops and shatters
        for (const s of pots) {
          if (s.st === "wait") { if (play && Math.abs(p.x - s.x) < 2 && p.y < s.y) { s.st = "wobble"; s.t = 0.25; SFX.creak(); } continue; }
          if (s.st === "wobble") { s.t -= dt; s.mesh.rotation.z = Math.sin(s.t * 60) * 0.18; if (s.t <= 0) { s.st = "fall"; s.vy = -2; s.mesh.rotation.z = 0; } }
          else if (s.st === "fall") {
            s.vy -= GRAV * 1.6 * dt; s.y += s.vy * dt; s.mesh.position.y = s.y; s.mesh.rotation.z += dt * 2;
            const hit = play && overlap(p.x, p.y, HW, HH, s.x, s.y + 0.25, 0.2, 0.25);
            if (hit || solid(Math.floor(s.x), Math.floor(s.y - 0.01)) || s.y < -3) {
              s.st = "gone"; s.mesh.visible = false; SFX.crash();
              for (let k = 0; k < 8; k++) { const m = tri([0, 0, 0.12, 0.02, 0.05, 0.1], k % 3 ? HM.pot : HM.leaf); m.position.set(s.x, s.y + 0.1, 0); addBit(m, { vx: rnd(-3, 3), vy: rnd(2, 5), spin: rnd(-10, 10), life: 0.8 }); }
              if (hit) die("squash");
            }
          }
        }
        // Kayan Halı: step on it, it is yanked away and she is flung 3 tiles back
        for (const r of rugs) {
          r.t -= dt;
          if (play && r.t <= 0 && p.onGround && Math.abs(p.x - r.x) < 0.8 && Math.abs(p.y - HH - r.y) < 0.15) {
            const back = -(Math.sign(p.vx) || p.face);
            p.fling = 0.4; p.flingV = back * 7.5; p.vy = 7; p.onGround = false; p.coyote = 0; p.buf = 0; p.jumping = false;
            r.off = -back * 0.8; r.t = 1.2; SFX.whoosh(0.7); SFX.jump(); shakeT = Math.max(shakeT, 0.1); dust(p.x, p.y - HH, 6, back);
          }
          if (r.t < 0.6) r.off *= Math.pow(0.02, dt);
          r.mesh.position.x = r.x + r.off;
        }
      }

      /* ===== Update: Hastane traps ===== */
      const zapBits = (x, y, n) => { for (let k = 0; k < n; k++) { const m = circle(rnd(0.02, 0.045), HP.spark); m.position.set(x + rnd(-0.4, 0.4), y + 0.08, 0); addBit(m, { vx: rnd(-2.5, 2.5), vy: rnd(1, 4), life: rnd(0.2, 0.4) }); } };
      function updateHastane(dt) {
        const play = state === "play";
        // Elektrikli Zemin: every plate is live for 1.2 s, then off for 1.2 s; standing on a live plate = death
        if (plates.length) {
          elecT += dt;
          const on = elecT % 2.4 >= 1.2, near = plates.some((e) => Math.abs(e.x - p.x) < 9);
          HP.glow.opacity = on ? 0.55 + 0.35 * Math.sin(lt * 50) : 0;
          if (on !== elecOn) { elecOn = on; if (on && near) SFX.zap(); }
          if (on) {
            humT -= dt; if (humT <= 0 && near) { humT = 0.16; tone("sawtooth", 118, 112, 0.14, 0.035); noise(0.08, "highpass", 5000, 3000, 0.03); }
            for (const e of plates) {
              if (onScreen(e.x) && Math.random() < dt * 6) zapBits(e.x, e.y, 1);
              if (play && p.onGround && Math.abs(p.y - HH - e.y) < 0.15 && Math.abs(p.x - e.x) < 0.5 + HW * 0.4) {
                zapBits(p.x, e.y, 12); SFX.zap(); shakeT = Math.max(shakeT, 0.25); die("spike");
              }
            }
          }
        }
        // Sedye: rolls back and forth on its track; she can ride on top, a side hit sends her flying
        for (const s of gurneys) {
          const ox = s.x; s.x = s.bx + 1.7 * Math.sin(lt * 1.4 + s.ph);
          const v = s.x - ox, sg = Math.sign(v);
          if (sg && sg !== s.dir) { if (s.dir && onScreen(s.x)) SFX.squeak(); s.dir = sg; }
          s.mesh.userData.wheels.forEach((w) => (w.rotation.z -= v / 0.09));
          if (play && p.gurney === s) p.x += v;
          else if (play && overlap(p.x, p.y, HW, HH, s.x, s.y + 0.36, 0.8, 0.36) && p.y - HH < s.y + 0.62) {
            shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", Math.sign(p.x - s.x) || s.dir);
          }
          s.mesh.position.x = s.x;
        }
        // Serum Askısı: within 2 tiles it wobbles 0.3 s, then tips toward her and lies across 2 tiles
        for (const v of ivs) {
          if (v.st === "wait") { if (play && Math.abs(p.x - v.x) < 2 && Math.abs(p.y - HH - v.y) < 1.5) { v.st = "wobble"; v.t = 0.3; v.dir = Math.sign(p.x - v.x) || 1; SFX.creak(); } continue; }
          if (v.st === "wobble") { v.t -= dt; v.mesh.rotation.z = Math.sin(v.t * 70) * 0.07; if (v.t <= 0) { v.st = "fall"; v.w = 1.5; } }
          else if (v.st === "fall") {
            v.w += 14 * dt; v.a = Math.min(Math.PI / 2, v.a + v.w * dt); v.mesh.rotation.z = -v.dir * v.a;
            if (play) for (const d of [0.5, 0.9, 1.3, 1.7, 2.0]) {
              const hx = v.x + v.dir * Math.sin(v.a) * d, hy = v.y + Math.cos(v.a) * d;
              if (Math.abs(hx - p.x) < HW + 0.12 && Math.abs(hy - p.y) < HH + 0.12) { die("squash"); break; }
            }
            if (v.a >= Math.PI / 2) {
              v.st = "down"; SFX.crash(); if (onScreen(v.x)) shakeT = Math.max(shakeT, 0.15);
              for (let k = 0; k < 6; k++) { const m = circle(rnd(0.03, 0.06), HP.bag); m.position.set(v.x + v.dir * 1.75, v.y + 0.15, 0); addBit(m, { vx: rnd(-2, 2), vy: rnd(1.5, 3.5), life: 0.6 }); }
            }
          }
        }
        // Otomatik Kapı: shut for 1 s of every 2.5 s, red lamp 0.4 s before; caught while closing = squash, shut = wall
        for (const d of adoors) {
          d.t += dt;
          const ph = d.t % 2.5, shut = ph >= 1.5, red = ph >= 1.1;
          if (red !== d.red) { d.red = red; d.lamp.color.setHex(red ? 0xff2a2a : 0x3a1010); if (red && onScreen(d.x)) SFX.beep(); }
          const pk = d.k; d.k = Math.max(0, Math.min(1, d.k + ((shut ? 1 : -1) * dt) / 0.15));
          if (onScreen(d.x)) {
            if (shut && pk === 0 && d.k > 0) SFX.whoosh(0.4);
            if (pk < 1 && d.k >= 1) { noise(0.2, "lowpass", 900, 200, 0.35); shakeT = Math.max(shakeT, 0.06); }
          }
          const off = 0.9 * (1 - d.k); d.L.position.x = d.x - 0.25 - off; d.R.position.x = d.x + 0.25 + off;
          if (play && d.k >= 0.3 && Math.abs(p.x - d.x) < 0.5 + HW && p.y - HH < d.y + 2.4) {
            if (shut && pk < 1) { p.x = d.x; p.vx = 0; SFX.bang(); die("squash"); }
            else { p.x = p.x < d.x ? d.x - 0.5 - HW - 0.001 : d.x + 0.5 + HW + 0.001; p.mvx = 0; }
          }
        }
        // Şırınga Rafı: front edge within 0.9 tiles (or under it) = 3 syringes drop one by one, 0.08 s apart, fast like V
        for (const s of syringes) {
          if (s.st === "idle" && play && p.y < s.y) {
            let dx = s.x - p.x;
            for (const q of s.set.cl) if (Math.abs(q.x - p.x) < Math.abs(dx)) dx = q.x - p.x;
            const side = Math.sign(dx), toward = side !== 0 && Math.abs(p.vx) > 0.1 && Math.sign(p.vx) === side;
            if (Math.abs(dx) < 0.5 || (toward && Math.abs(dx) - HW <= 0.9)) {
              const d = Math.sign(p.vx) || p.face || 1;
              s.set.cl.slice().sort((a, b) => (a.x - b.x) * d).forEach((q, k) => { if (q.st === "idle") { q.st = "warn"; q.warn = 0.08 + k * 0.08; } });
              shakeT = Math.max(shakeT, 0.08); SFX.creak();
            }
          }
          if (s.st === "warn") { s.warn -= dt; s.mesh.position.x = s.x + Math.sin(s.warn * 70) * 0.04; if (s.warn <= 0) { s.st = "fall"; s.vy = -10; s.mesh.position.x = s.x; SFX.needle(); } }
          else if (s.st === "fall") {
            s.vy -= 120 * dt; s.y += s.vy * dt;
            if (solid(Math.floor(s.x), Math.floor(s.y - 0.65))) { s.y = Math.floor(s.y - 0.65) + 1.55; s.st = "stuck"; s.life = 0.6; if (onScreen(s.x)) SFX.tick(); }
            if (play && overlap(p.x, p.y, HW, HH, s.x, s.y - 0.4, 0.08, 0.25)) { SFX.needle(); die("spike"); }
            if (s.y < -5) s.st = "gone";
          } else if (s.st === "stuck") { s.life -= dt; s.mesh.scale.setScalar(Math.max(0.01, s.life / 0.6)); if (s.life <= 0) { s.st = "gone"; s.mesh.visible = false; } }
          s.mesh.position.y = s.y;
        }
        // Hap Kutusu: every 2 s the lid pops and 3 bouncing pills spray in an arc toward her; pills kill
        for (const b of bottles) {
          const near = Math.abs(p.x - b.x) < 12;
          b.t += dt;
          if (b.t >= 2) {
            b.t -= 2;
            if (near && play) {
              b.lidT = 0.45; SFX.tap(); tone("square", 520, 1250, 0.08, 0.08);
              const dir = Math.sign(p.x - b.x) || -1;
              [[2.6, 8.5], [3.8, 7.5], [5.0, 6.2]].forEach(([vx, vy]) => {
                const m = new THREE.Group(); m.add(box(0.13, 0.24, HP.pill, 0, 0.06, 0)); m.add(box(0.13, 0.12, HP.pill2, 0, -0.06, 0.005));
                m.position.set(b.x, b.y + 1.15, 1.2); level.add(m);
                pills.push({ x: b.x, y: b.y + 1.15, vx: dir * vx, vy, life: 2.2, bnc: 0, spin: rnd(-12, 12), mesh: m });
              });
            }
          }
          const lid = b.mesh.userData.lid;
          if (b.lidT > 0) { b.lidT -= dt; const k = Math.max(0, b.lidT) / 0.45; lid.position.y = 1.12 + Math.sin(k * Math.PI) * 0.5; lid.rotation.z = Math.sin(k * Math.PI) * 0.6; }
          else { lid.position.y = 1.12; lid.rotation.z = 0; }
        }
        for (let i = pills.length - 1; i >= 0; i--) {
          const q = pills[i];
          q.life -= dt; q.vy = Math.max(q.vy - GRAV * dt, -20); q.y += q.vy * dt; q.x += q.vx * dt;
          if (q.vy < 0 && solid(Math.floor(q.x), Math.floor(q.y - 0.1))) {
            q.y = Math.floor(q.y - 0.1) + 1.1; q.vy = Math.abs(q.vy) > 2 ? -q.vy * 0.55 : 0; q.vx *= 0.8;
            if (q.bnc++ < 3 && onScreen(q.x)) tone("triangle", 1400 - q.bnc * 200, 900, 0.04, 0.04);
          }
          if (solid(Math.floor(q.x + Math.sign(q.vx) * 0.1), Math.floor(q.y))) q.vx = -q.vx * 0.5;
          q.mesh.rotation.z += q.spin * dt * (q.vy ? 1 : 0.1); q.mesh.position.set(q.x, q.y, 1.2);
          if (play && q.life > 0 && overlap(p.x, p.y, HW, HH, q.x, q.y, 0.1, 0.1)) { SFX.crash(); die("spike", Math.sign(q.vx)); }
          if (q.life <= 0 || q.y < -3) { q.mesh.scale.setScalar(Math.max(0, 1 + q.life * 4)); if (q.life < -0.25 || q.y < -3) { level.remove(q.mesh); pills.splice(i, 1); } }
        }
        // Bipleyen Asansör: land on it, the lamp beeps 3 times over 1 s, then it drops (fall handled with the chain platforms)
        for (const pl of plats) if (pl.t === "B" && pl.drop !== null) {
          if (pl.fallen) { if (!pl.snd) { pl.snd = true; pl.lamp.color.setHex(0x3a1010); if (onScreen(pl.x)) noise(0.25, "lowpass", 1200, 200, 0.3); } continue; }
          const n = Math.min(3, Math.floor((1 - pl.drop) / 0.333) + 1);
          if (n > pl.beeps) { pl.beeps = n; tone("square", 880 + n * 120, 860 + n * 120, 0.1, 0.06); }
          pl.lamp.color.setHex((1 - pl.drop) % 0.333 < 0.15 ? 0xff2a2a : 0x3a1010);
        }
        // Yemek Tepsisi Arabası: within 4 tiles it rolls at her fast, rattling; jump it
        for (const c of carts) {
          if (c.st === "wait") {
            if (play && Math.abs(p.x - c.x) < 4 && Math.abs(p.y - HH - c.y) < 1.5) { c.st = "roll"; c.dir = Math.sign(p.x - c.x) || -1; c.vx = c.dir * 3; c.mesh.scale.x = c.dir; SFX.crash(); }
            else continue;
          }
          if (c.st === "roll") {
            c.vx = c.dir * Math.min(7, Math.abs(c.vx) + 24 * dt);
            const r = floorPhys(c, 0.45, dt); c.dist += Math.abs(c.vx * dt);
            c.rt -= dt; if (c.rt <= 0) { c.rt = 0.09; if (onScreen(c.x)) { noise(0.05, "bandpass", 3200, 1800, 0.12); tone("square", 700 + Math.random() * 500, 500, 0.03, 0.03); } }
            c.mesh.rotation.z = Math.sin(lt * 60) * 0.02;
            if (play && overlap(p.x, p.y, HW, HH, c.x, c.y + 0.5, 0.45, 0.5)) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", c.dir); }
            if (r === "wall") { c.st = "stop"; SFX.crash(); if (onScreen(c.x)) shakeT = Math.max(shakeT, 0.1); c.mesh.rotation.z = c.dir * 0.2; }
            else if (r === "water") c.st = "sink";
            else if (r === "gone" || c.dist > 40) { c.st = "stop"; c.mesh.visible = false; }
          } else if (c.st === "sink") { c.y -= 0.6 * dt; c.mesh.position.z = 0.2; if (c.y < -2) c.st = "stop"; }
          c.mesh.position.x = c.x; c.mesh.position.y = c.y;
        }
        // Tekerlekli Defibrilatör Arabası: 2 s cycle; 0.4 s ŞARJ beep, then a 0.35 s lightning arc 2 tiles toward her (burn)
        for (const q of defibs) {
          q.t += dt;
          const ph = q.t % 2, near = onScreen(q.x), tell = ph >= 1.25 && ph < 1.65, on = ph >= 1.65;
          if (!tell && !on) q.dir = p.x < q.x ? -1 : 1;
          if (tell && !q.tell && near) { tone("square", 1200, 1250, 0.12, 0.05); tone("square", 1500, 1550, 0.12, 0.05, 0.14); tone("sine", 400, 2400, 0.4, 0.04); }
          q.tell = tell;
          q.scr.color.setScalar(tell ? (Math.floor(lt * 14) % 2 ? 1 : 0.5) : on ? 1 : 0.3);
          q.led.color.setHex(tell || on ? 0xff3a2a : 0x3a1a1a);
          q.paddles.forEach((pd, k) => { pd.position.y = 1.32 + (tell ? Math.sin(lt * 60 + k * 3) * 0.02 : 0); });
          if (on && !q.on && near) { SFX.zap(); noise(0.35, "highpass", 5000, 2500, 0.2); shakeT = Math.max(shakeT, 0.08); }
          q.on = on; q.arc.visible = on;
          if (!on) continue;
          const x0 = q.x + q.dir * 0.45, x1 = q.x + q.dir * 2.45, ay = q.y + 0.75;
          q.rt -= dt;
          if (q.rt <= 0) { // re-jag the bolt
            q.rt = 0.04; let px = x0, py = ay;
            q.arc.children.forEach((s, k) => {
              if (k === 8) { s.position.set((x0 + x1) / 2, ay, 1.1); return; }
              const nx = x0 + (x1 - x0) * (k + 1) / 8, ny = k === 7 ? ay : ay + rnd(-0.2, 0.2);
              s.scale.x = Math.hypot(nx - px, ny - py) / 0.3; s.rotation.z = Math.atan2(ny - py, nx - px);
              s.position.set((px + nx) / 2, (py + ny) / 2, 1.15); px = nx; py = ny;
            });
            if (near && Math.random() < 0.5) { const m = circle(rnd(0.02, 0.04), HP.spark); m.position.set(x1, ay, 0); addBit(m, { vx: rnd(-2, 2), vy: rnd(0.5, 2.5), life: 0.3, z: 2.5 }); }
          }
          if (play && overlap(p.x, p.y, HW, HH, (x0 + x1) / 2, ay, 1, 0.28)) { shakeT = Math.max(shakeT, 0.2); SFX.zap(); die("burn"); }
        }
      }

      /* ===== Update: Kasap/Mezbaha traps ===== */
      function updateKasap(dt) {
        const play = state === "play";
        // Et Kancası: slides ±2 tiles on its rail at head height; time your run behind it or jump it
        for (const h of meatHooks) {
          const ox = h.x; h.x = h.bx + 2 * Math.sin(lt * 1.5 + h.ph);
          const v = h.x - ox, sg = Math.sign(v);
          if (sg && sg !== h.dir) { if (h.dir && onScreen(h.x)) SFX.tick(); h.dir = sg; }
          h.mesh.position.x = h.x;
          if (play && overlap(p.x, p.y, HW, HH, h.x, h.y - 0.02, 0.18, 0.22)) {
            shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", sg || Math.sign(p.x - h.x) || 1);
          }
        }
        // Satır Fırlatan: 0.3 s shine on the cleaver, then it is thrown spinning straight at her; every 1.8 s
        for (const b of cleaverBlocks) {
          const pt = b.t; b.t -= dt;
          if (b.t < 0.3) {
            if (pt >= 0.3 && Math.abs(p.x - b.x) < 14 && onScreen(b.x)) tone("triangle", 2400, 3400, 0.14, 0.05);
            b.gm.opacity = 0.9 * Math.sin((Math.max(0, b.t) / 0.3) * Math.PI); b.gl.rotation.z += dt * 9;
            b.cl.position.x = 0.02 + Math.sin(b.t * 80) * 0.02;
          } else { b.gm.opacity = 0; b.cl.position.x = 0.02; }
          if (b.t < 1.3) b.cl.visible = true;
          if (b.t <= 0) {
            b.t = 1.8; b.gm.opacity = 0;
            if (Math.abs(p.x - b.x) > 14) continue;
            const dir = Math.sign(p.x - b.x) || -1, m = cleaverMesh();
            m.scale.x = dir; m.position.set(b.x + dir * 0.3, b.y, 1.5); level.add(m); b.cl.visible = false;
            cleavers.push({ x: b.x + dir * 0.3, y: b.y, vx: dir * 6.5, dist: 0, mesh: m });
            if (onScreen(b.x)) SFX.whoosh(0.5);
          }
        }
        for (let i = cleavers.length - 1; i >= 0; i--) {
          const a = cleavers[i], d = Math.sign(a.vx);
          a.x += a.vx * dt; a.dist += Math.abs(a.vx * dt); a.mesh.position.x = a.x; a.mesh.rotation.z -= d * 14 * dt;
          if (play && overlap(p.x, p.y, HW, HH, a.x, a.y, 0.2, 0.14)) die("saw", d);
          if (crates.some((c) => overlap(a.x, a.y, 0.2, 0.14, c.x, c.y, c.hw, c.hh)) || solid(Math.floor(a.x + d * 0.25), Math.floor(a.y)) || a.dist > 14) {
            if (onScreen(a.x) && a.dist <= 14) SFX.tick();
            level.remove(a.mesh); cleavers.splice(i, 1);
          }
        }
        // Kıyma Makinesi: rollers grind at the bottom of the pit; falling in = death (the rim crumbles as fake ground)
        for (const g of grinders) {
          g.rolls[0].rotation.z -= 7 * dt; g.rolls[1].rotation.z += 7 * dt;
          const dist = Math.hypot(p.x - g.x, p.y - g.y);
          danger = Math.min(danger, dist + 1);
          g.gr -= dt;
          if (g.gr <= 0 && dist < 9) { g.gr = 0.18; const k = 1 - dist / 9; noise(0.14, "bandpass", 600, 300, 0.15 * k); tone("sawtooth", 70, 55, 0.14, 0.05 * k); }
          if (play && p.x > g.l && p.x < g.r && p.y - HH < g.y + 1.2) { SFX.bang(); shakeT = Math.max(shakeT, 0.3); buzz(90); die("saw", 1); }
        }
        // Asılı Dana: within 1.5 tiles it creaks 0.45 s, then swings toward her like a pendulum, slowly settling
        for (const k of carcasses) {
          if (k.st === "wait") {
            k.a = 0.04 * Math.sin(lt * 1.3 + k.ph);
            if (play && Math.abs(p.x - k.x) < 1.5 && Math.abs(p.y - (k.py - k.L)) < 2) { k.st = "tell"; k.t = 0.45; k.dir = Math.sign(p.x - k.x) || 1; SFX.creak(); }
          } else if (k.st === "tell") {
            k.t -= dt; k.a = Math.sin(k.t * 60) * 0.06;
            if (k.t <= 0) { k.st = "swing"; k.a = 0; k.w = k.dir * 2.96; SFX.whoosh(0.6); }
          } else if (k.st === "swing") {
            const pa = k.a;
            k.w += -8 * Math.sin(k.a) * dt; k.w *= 1 - 0.25 * dt; k.a += k.w * dt;
            if (Math.sign(pa) !== Math.sign(k.a) && Math.abs(k.w) > 1 && onScreen(k.x)) SFX.whoosh(Math.min(1, Math.abs(k.w) / 3));
            if (Math.abs(k.a) < 0.05 && Math.abs(k.w) < 0.25) { k.st = "rest"; k.t = 0.6; }
          } else if (k.st === "rest") { k.a *= Math.pow(0.05, dt); k.t -= dt; if (k.t <= 0) k.st = "wait"; }
          k.mesh.rotation.z = k.a;
          if (!play) continue;
          const sn = Math.sin(k.a), cs = Math.cos(k.a);
          for (const o of [-0.35, 0, 0.35]) {
            const hx = k.x + (k.L + o) * sn, hy = k.py - (k.L + o) * cs;
            const qx = Math.max(p.x - HW, Math.min(p.x + HW, hx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, hy));
            if (Math.hypot(qx - hx, qy - hy) < 0.3) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", Math.abs(k.w) > 0.5 ? Math.sign(k.w) : Math.sign(p.x - hx) || 1); break; }
          }
        }
        // Soğuk Hava Kapısı: within 1 tile it hisses 0.5 s, slams shut sideways in 0.12 s (caught = squash), stays shut 2 s, reopens
        for (const d of freezers) {
          const near = Math.abs(p.x - d.x) - HW - 0.28 < 1 && Math.abs(p.y - HH - d.y) < 2;
          if (d.st === "wait") {
            if (play && near) { d.st = "tell"; d.t = 0.5; if (onScreen(d.x)) { noise(0.5, "highpass", 6500, 3500, 0.22); tone("sine", 3200, 2600, 0.5, 0.02); } }
          } else if (d.st === "tell") {
            d.t -= dt; if (d.t <= 0) { d.st = "slam"; if (onScreen(d.x)) SFX.whoosh(0.5); }
          } else if (d.st === "slam") {
            d.k = Math.min(1, d.k + dt / 0.12);
            if (d.k >= 1) {
              d.st = "shut"; d.t = 2;
              if (onScreen(d.x)) { noise(0.3, "lowpass", 900, 120, 0.45); tone("sine", 95, 40, 0.25, 0.3); shakeT = Math.max(shakeT, 0.12); }
            }
          } else if (d.st === "shut") {
            d.t -= dt; if (d.t <= 0) { d.st = "open"; if (onScreen(d.x)) noise(0.4, "highpass", 4000, 2500, 0.1); }
          } else if (d.st === "open") { d.k = Math.max(0, d.k - dt / 0.5); if (d.k <= 0) d.st = "wait"; }
          d.mm.opacity = d.st === "tell" ? 0.75 * Math.sin((d.t / 0.5) * Math.PI) : Math.max(0, d.mm.opacity - dt * 3);
          d.mist.position.y = d.y + 0.2 + (d.st === "tell" ? (0.5 - d.t) * 0.48 : 0.24);
          d.mesh.position.x = d.x - 1.05 * (1 - d.k);
          d.mesh.position.y = d.y + 1.2 + (d.st === "tell" ? Math.sin(d.t * 90) * 0.015 : 0);
          if (play && d.k >= 0.5 && Math.abs(p.x - d.x) < 0.28 + HW && p.y - HH < d.y + 2.4) {
            if (d.st === "slam") { p.x = d.x; p.vx = 0; SFX.bang(); die("squash"); }
            else { p.x = p.x < d.x ? d.x - 0.28 - HW - 0.001 : d.x + 0.28 + HW + 0.001; p.mvx = 0; p.slideV = 0; }
          }
        }
        // Sucuk Sarkacı: a short pendulum of sausages, 1.2 s period; hit = knocked flying
        for (const q of sausages) {
          const ph = ((lt + q.ph) / 1.2) * Math.PI * 2;
          q.a = 0.95 * Math.sin(ph); q.mesh.rotation.z = q.a;
          const side = Math.sign(q.a);
          if (side && side !== q.side) { if (q.side && onScreen(q.x)) SFX.whoosh(0.35); q.side = side; }
          if (!play) continue;
          const sn = Math.sin(q.a), cs = Math.cos(q.a), sw = Math.sign(Math.cos(ph)) || 1;
          for (const o of [0.75, 1.11, 1.47, 1.83]) {
            const hx = q.x + o * sn, hy = q.py - o * cs;
            const qx = Math.max(p.x - HW, Math.min(p.x + HW, hx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, hy));
            if (Math.hypot(qx - hx, qy - hy) < 0.17) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", sw); break; }
          }
        }
        // Konveyör Bant: ridges and meat chunks ride at 3 tiles/s; a low rumble near it
        for (const b of belts) {
          const off = lt * 3 * b.dir, wrap = (v) => ((v % b.n) + b.n) % b.n;
          b.ridges.forEach((rd, k) => { rd.position.x = b.l + wrap(k / 3 + off); });
          b.meat.forEach((mt, k) => { mt.position.x = b.l + 0.15 + wrap(k * 2 + 0.5 + off) * ((b.n - 0.3) / b.n); });
          b.rt -= dt;
          if (b.rt <= 0) { b.rt = 0.3; const dist = Math.abs(p.x - (b.l + b.n / 2)); if (dist < 8) tone("square", 55, 50, 0.2, 0.025 * (1 - dist / 8)); }
        }
        // Yuvarlanan Kıyma Topu: within 7 tiles a big meatball rolls at her (knocked flying); jump it, it sinks in water
        for (const s of meatballs) {
          if (s.st === "wait") {
            if (play && Math.abs(p.x - s.x) < 7 && Math.abs(p.y - HH - s.y) < 1.5) { s.st = "roll"; s.dir = Math.sign(p.x - s.x) || -1; noise(0.35, "lowpass", 500, 200, 0.18); tone("sine", 90, 60, 0.3, 0.08); }
            else { s.mesh.position.set(s.x, s.y + s.r, 1.9); continue; }
          }
          if (s.st === "roll") {
            s.vx = s.dir * Math.min(5.5, Math.abs(s.vx) + 9 * dt);
            const r = floorPhys(s, s.r, dt); s.dist += Math.abs(s.vx * dt);
            s.mesh.rotation.z -= (s.vx * dt) / s.r;
            if (Math.random() < dt * 8 && onScreen(s.x)) { const m = circle(rnd(0.03, 0.06), KS.meatD); m.position.set(s.x - s.dir * s.r, s.y + 0.05, 0); addBit(m, { vx: -s.dir * rnd(0.5, 1.5), vy: rnd(0.5, 1.5), life: 0.4, z: 2.5 }); }
            if (play && Math.hypot(Math.max(p.x - HW, Math.min(s.x, p.x + HW)) - s.x, Math.max(p.y - HH, Math.min(s.y + s.r, p.y + HH)) - s.y - s.r) < s.r * 0.9) {
              shakeT = Math.max(shakeT, 0.25); SFX.bang(); die("arrow", s.dir);
            }
            if (r === "wall" || r === "gone" || s.dist > 40) {
              s.st = "gone"; s.mesh.visible = false;
              if (r === "wall" && onScreen(s.x)) { SFX.splash(); shakeT = Math.max(shakeT, 0.1); for (let k = 0; k < 8; k++) { const m = circle(rnd(0.05, 0.1), KS.meatD); m.position.set(s.x, s.y + s.r, 0); addBit(m, { vx: rnd(-3, 3), vy: rnd(1, 4), life: 0.6, z: 2.5 }); } }
            } else if (r === "water") { s.st = "sink"; if (onScreen(s.x)) SFX.splash(); }
          }
          if (s.st === "sink") { s.y -= 0.8 * dt; if (s.y < -3) { s.st = "gone"; s.mesh.visible = false; } }
          s.mesh.position.set(s.x, s.y + s.r, s.st === "sink" ? 0.2 : 1.9);
        }
      }

      /* ===== Update: Lunapark traps ===== */
      function updateLunapark(dt) {
        const play = state === "play";
        // Çarpışan Araba: drives back and forth between the padded walls of its 6-tile track, honking at every bounce
        for (const c of bumpers) {
          c.x += c.v * dt;
          const lo = c.bx - 3 + 0.1 + 0.5, hi = c.bx + 3 - 0.1 - 0.5;
          if (c.x > hi || c.x < lo) {
            c.x = Math.max(lo, Math.min(hi, c.x)); c.v = -c.v; c.mesh.scale.x = Math.sign(c.v);
            if (onScreen(c.x)) { honk(); noise(0.12, "lowpass", 900, 200, 0.2); if (Math.abs(p.x - c.x) < 6) shakeT = Math.max(shakeT, 0.05); }
          }
          c.mesh.position.x = c.x; c.mesh.position.y = c.y + Math.abs(Math.sin(lt * 9)) * 0.02;
          if (play && overlap(p.x, p.y, HW, HH, c.x, c.y + 0.38, 0.48, 0.38)) { shakeT = Math.max(shakeT, 0.2); honk(); SFX.bang(); die("arrow", Math.sign(c.v)); }
        }
        // Palyaço Kutusu: within 1 tile the crank turns to a 0.3 s music-box tune, then the clown springs up leaning at her
        for (const j of jacks) {
          const u = j.mesh.userData;
          if (j.st === "wait") {
            if (play && Math.abs(p.x - j.x) - HW - 0.31 < 1 && Math.abs(p.y - HH - j.y) < 1.5) {
              j.st = "tell"; j.t = 0.3;
              if (onScreen(j.x)) [1047, 1319, 1568, 1319].forEach((f, k) => tone("triangle", f, f * 0.99, 0.07, 0.07, k * 0.075));
            }
          } else if (j.st === "tell") {
            j.t -= dt; u.crank.rotation.z -= dt * 22; j.mesh.position.x = j.x + Math.sin(j.t * 80) * 0.02;
            if (j.t <= 0) {
              j.st = "pop"; j.dir = Math.sign(p.x - j.x) || 1; j.mesh.position.x = j.x; u.jack.visible = true;
              if (onScreen(j.x)) { tone("sine", 220, 900, 0.18, 0.18); SFX.squeak(); SFX.laugh(); }
            }
          } else if (j.st === "pop") { j.k = Math.min(1, j.k + dt / 0.1); if (j.k >= 1) { j.st = "out"; j.t = 1; } }
          else if (j.st === "out") { j.t -= dt; if (j.t <= 0) j.st = "back"; }
          else if (j.st === "back") { j.k = Math.max(0, j.k - dt / 0.4); if (j.k <= 0) { j.st = "cool"; j.t = 1; u.jack.visible = false; if (onScreen(j.x)) SFX.tick(); } }
          else if (j.st === "cool") { j.t -= dt; if (j.t <= 0) j.st = "wait"; }
          // spring stretches, head bobs on it, lid flips open
          const a = 0.35 * j.k, h = 0.25 + 1.2 * j.k, bob = j.st === "out" ? Math.sin(lt * 18) * 0.06 * j.t : 0;
          u.spring.scale.y = Math.max(0.05, j.k); u.head.position.y = h + bob; u.jack.rotation.z = -j.dir * (a + bob);
          u.lid.rotation.z = Math.min(1, j.k * 3) * 2.2;
          if (play && j.k > 0.3) {
            const ang = a + bob;
            for (const d of [0.3, 0.6, 0.9, 1.2, h]) {
              const hx = j.x + j.dir * Math.sin(ang) * d, hy = j.y + 0.6 + Math.cos(ang) * d, r = d === h ? 0.3 : 0.14;
              const qx = Math.max(p.x - HW, Math.min(p.x + HW, hx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, hy));
              if (d <= h && Math.hypot(qx - hx, qy - hy) < r) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", Math.sign(p.x - j.x) || j.dir); break; }
            }
          }
        }
        // Dönme Dolap: the wheel turns slowly; cabins hang level and carry her; the rigged one drops 0.6 s after she lands
        for (const wh of wheels) {
          wh.a += 0.45 * dt; wh.rot.rotation.z = wh.a;
          wh.cabs.forEach((cb, k) => {
            if (cb.fallen) {
              cb.vy = Math.max(cb.vy - GRAV * dt, -20); cb.y += cb.vy * dt; cb.mesh.position.y = cb.y; cb.mesh.rotation.z += dt * 1.8;
              if (p.cab === cb) p.cab = null;
              if (cb.y < -4) cb.mesh.visible = false;
              return;
            }
            const ox = cb.x, oy = cb.y, th = wh.a + (k * Math.PI) / 2;
            cb.x = wh.x + wh.R * Math.cos(th); cb.y = wh.cy + wh.R * Math.sin(th) - 0.5;
            let jig = 0;
            if (cb.drop !== null) {
              cb.drop -= dt; jig = Math.sin(lt * 70) * 0.05;
              if (cb.drop <= 0) { cb.fallen = true; cb.vy = -1; if (p.cab === cb) p.cab = null; SFX.crash(); SFX.click(); if (onScreen(cb.x)) shakeT = Math.max(shakeT, 0.12); }
            }
            if (play && p.cab === cb) { p.x += cb.x - ox; p.y += cb.y - oy; }
            cb.mesh.position.set(cb.x + jig, cb.y, 1.3);
          });
        }
        // Balon Patlatma: the spike bar is out 1.2 s, in 0.8 s of every 2 s; a popped balloon throws her 3 tiles up
        const sOut = lt % 2 < 1.2;
        for (const b of balloons) {
          if (sOut !== b.out) { b.out = sOut; if (onScreen(b.x) && !balloons.some((q) => q.y === b.y && Math.abs(q.x - b.x + 1) < 0.01)) SFX.tick(); } // one tick per spike row
          b.k = Math.max(0, Math.min(1, b.k + ((sOut ? 1 : -1) * dt) / 0.1));
          b.spk.position.y = b.tipY + 0.36 * (1 - b.k);
          if (!b.popped) {
            b.mesh.position.y = b.y + Math.sin(lt * 2.4 + b.x) * 0.03;
            if (play && overlap(p.x, p.y, HW, HH, b.x, b.y + 0.42, 0.28, 0.34)) {
              b.popped = true; b.mesh.visible = false;
              SFX.bang(); noise(0.2, "highpass", 3500, 1200, 0.6); shakeT = Math.max(shakeT, 0.15); buzz(40);
              for (let k = 0; k < 8; k++) { const m = tri([0, 0, 0.12, 0.03, 0.04, 0.11], b.mesh.children[0].material); m.position.set(b.x, b.y + 0.45, 0); addBit(m, { vx: rnd(-4, 4), vy: rnd(1, 5), spin: rnd(-12, 12), life: 0.7 }); }
              p.vy = Math.sqrt(2 * GRAV * 3.05); p.onGround = false; p.coyote = 0; p.buf = 0; p.jumping = false; p.y = Math.max(p.y, b.y + HH + 0.05);
            }
          }
          if (play && b.k > 0.5 && Math.abs(p.x - b.x) < 0.5 + HW && p.y + HH > b.tipY + 0.05 && p.y - HH < b.tipY + 0.3) { SFX.needle(); die("spike"); }
        }
        // Hız Treni Vagonu: stepping on the switch flips it, a bell rings 0.4 s, then the cart rushes in from off-screen right
        for (const c of coasters) {
          if (c.st === "wait") {
            if (play && p.onGround && Math.abs(p.x - c.x) < 0.45 && Math.abs(p.y - HH - c.y) < 0.15) {
              c.st = "tell"; c.t = 0.4; c.sw.rotation.z = -0.5; SFX.click(); bell();
            }
          } else if (c.st === "tell") {
            c.t -= dt;
            if (c.t <= 0) { c.st = "run"; c.cx = Math.min(c.x + 15, Math.max(c.x + 4, camX + viewW / 2 + 1.2)); c.mesh.visible = true; c.rt = 0; SFX.whoosh(0.8); }
          } else if (c.st === "run") {
            c.cx -= 16 * dt; c.rt -= dt;
            c.mesh.position.x = c.cx; c.mesh.position.y = c.y + 0.12 + Math.abs(Math.sin(lt * 30)) * 0.02;
            if (c.rt <= 0 && onScreen(c.cx)) { c.rt = 0.12; noise(0.12, "lowpass", 500, 200, 0.12); if (Math.abs(p.x - c.cx) < 5) shakeT = Math.max(shakeT, 0.05); }
            if (play && overlap(p.x, p.y, HW, HH, c.cx, c.y + 0.45, 0.6, 0.33)) { shakeT = Math.max(shakeT, 0.25); SFX.bang(); bell(); die("arrow", -1); }
            if (c.cx < c.x - 10) { c.st = "cool"; c.t = 1.5; c.mesh.visible = false; }
          } else if (c.st === "cool") { c.t -= dt; if (c.t <= 0) { c.st = "wait"; c.sw.rotation.z = 0.5; } }
        }
        // Pamuk Şeker Bulutu: the cloud breathes gently
        for (const k of candies) k.mesh.scale.y = 1 + Math.sin(lt * 2 + k.ph) * 0.04;
        // Ayna Labirenti: the "open gap" mirror glints now and then, and flashes when she bonks into it
        for (const m of mirrorPanes) {
          m.flash = Math.max(0, m.flash - dt);
          m.mat.opacity = 0.04 + 0.08 * Math.pow(Math.max(0, Math.sin(lt * 1.1 + m.ph)), 12) + m.flash * 0.8;
        }
        // Hedef Tahtası Okları: every 2.2 s a volley of 3 darts to the left, head, chest, feet, 0.15 s apart
        for (const tg of targets) {
          tg.t += dt;
          if (tg.t >= 2.2) { tg.t -= 2.2; tg.shot = 0; tg.seq = 0; }
          if (tg.t >= 1.95 && tg.t - dt < 1.95 && onScreen(tg.x)) SFX.click(); // cocking click before the volley
          if (tg.shot < 3) {
            tg.seq -= dt;
            if (tg.seq <= 0) {
              const h = [0.8, 0.5, 0.12][tg.shot], m = dartMesh(); m.position.set(tg.x - 0.45, tg.y + h, 1.6); level.add(m);
              darts.push({ x: tg.x - 0.45, y: tg.y + h, vx: -9, dist: 0, mesh: m });
              if (onScreen(tg.x)) { tone("square", 900, 300, 0.06, 0.06); noise(0.05, "highpass", 3000, 1500, 0.15); }
              tg.shot++; tg.seq = 0.15;
            }
          }
        }
        for (let i = darts.length - 1; i >= 0; i--) {
          const a = darts[i];
          a.x += a.vx * dt; a.dist += Math.abs(a.vx) * dt; a.mesh.position.x = a.x;
          if (play && overlap(p.x, p.y, HW, HH, a.x, a.y, 0.25, 0.04)) { SFX.needle(); SFX.bang(); level.remove(a.mesh); darts.splice(i, 1); die("arrow", -1); continue; }
          if (a.dist > 5 || solid(Math.floor(a.x - 0.3), Math.floor(a.y)) || crates.some((c) => overlap(a.x, a.y, 0.25, 0.04, c.x, c.y, c.hw, c.hh))) { level.remove(a.mesh); darts.splice(i, 1); }
        }
        // Su Tabancası Ördekleri: 3 tin ducks slide ±1.5 tiles together on a head-height rail; touching one = knocked flying
        for (const r of duckRails) {
          const off = 1.5 * Math.sin(lt * 1.6 + r.ph), v = Math.cos(lt * 1.6 + r.ph), sg = Math.sign(v);
          if (sg && sg !== r.dir) { if (r.dir && onScreen(r.x)) SFX.tick(); r.dir = sg; }
          r.ducks.forEach((d, k) => {
            const dx = r.x + off + (k - 1) * 2; r.xs[k] = dx;
            d.position.x = dx; d.position.y = r.y + Math.abs(Math.sin(lt * 9 + k)) * 0.03; d.scale.x = sg || 1;
          });
          if (play) for (const dx of r.xs) {
            if (overlap(p.x, p.y, HW, HH, dx, r.y + 0.02, 0.24, 0.24)) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", sg || Math.sign(p.x - dx) || 1); break; }
          }
        }
      }

      /* ===== Update: Kanalizasyon traps ===== */
      function updateKanal(dt) {
        const play = state === "play";
        // Fare Sürüsü: within 6 tiles the pack runs along the floor at her, squeaking; jump them, they fall into pits
        for (const pk of ratPacks) {
          if (pk.st === "wait") {
            if (play && Math.abs(p.x - pk.x) < 6 && Math.abs(p.y - HH - pk.y) < 2) {
              pk.st = "run"; const dir = Math.sign(p.x - pk.x) || -1;
              pk.rats.forEach((r) => { r.dir = dir; r.mesh.scale.x = dir; }); if (onScreen(pk.x)) SFX.squeak();
            } else continue;
          }
          pk.sq -= dt;
          if (pk.sq <= 0) { pk.sq = 0.25; const lead = pk.rats.find((r) => r.st === "run"); if (lead && onScreen(lead.x)) SFX.squeak(); }
          for (const r of pk.rats) {
            if (r.st !== "run") continue;
            r.vx = r.dir * r.sp;
            const res = floorPhys(r, 0.15, dt); r.dist += Math.abs(r.vx * dt);
            r.mesh.userData.legs.forEach((l, k) => { l.position.y = 0.03 + Math.max(0, Math.sin(lt * 40 + k * Math.PI)) * 0.03; });
            r.mesh.position.x = r.x; r.mesh.position.y = r.y + (r.ground ? Math.abs(Math.sin(lt * 30 + r.sp * 9)) * 0.02 : 0);
            if (play && overlap(p.x, p.y, HW, HH, r.x, r.y + 0.11, 0.14, 0.1)) { SFX.squeak(); SFX.click(); die("spike"); }
            if (res === "wall") { r.dir = -r.dir; r.mesh.scale.x = r.dir; }
            else if (res === "water") { r.st = "gone"; r.mesh.visible = false; if (onScreen(r.x)) SFX.splash(); }
            else if (res === "gone" || r.dist > 30) { r.st = "gone"; r.mesh.visible = false; }
          }
        }
        // Rögar Kapağı: hiss 0.4 s, then a steam jet blasts the lid up for 0.35 s; over it then = launched; otherwise plain floor
        for (const m of manholes) {
          const pt = m.t; m.t = (m.t + dt) % 2;
          const near = Math.abs(p.x - m.x) < 9;
          if (pt < 1.6 && m.t >= 1.6 && near) { noise(0.4, "highpass", 6500, 4000, 0.18); tone("sine", 3000, 2600, 0.4, 0.015); }
          if (m.t < pt) { // the blast
            if (near) { SFX.whoosh(0.9); noise(0.35, "lowpass", 1200, 150, 0.35); tone("square", 300, 120, 0.08, 0.06); if (Math.abs(p.x - m.x) < 5) shakeT = Math.max(shakeT, 0.12); }
          }
          const blast = m.t < 0.35, hiss = m.t >= 1.6;
          const lk = Math.min(1, m.t / 0.7);
          m.lid.position.y = m.y + 0.02 + (m.t < 0.7 ? 3 * Math.sin(Math.PI * lk) : 0) + (hiss ? Math.abs(Math.sin(lt * 70)) * 0.02 : 0);
          m.lid.rotation.z = m.t < 0.7 ? m.t * 14 : 0;
          m.steam.scale.y = blast ? Math.min(1, m.t / 0.08) : Math.max(0.01, m.steam.scale.y - dt * 3);
          m.mat.opacity = blast ? 0.75 : hiss ? 0.15 + 0.1 * Math.sin(lt * 40) : Math.max(0, m.mat.opacity - dt * 2.5);
          if (hiss) m.steam.scale.y = Math.max(m.steam.scale.y, 0.12);
          if (play && blast && Math.abs(p.x - m.x) < 0.4 + HW && p.y - HH < m.y + 3.2 && p.y + HH > m.y) {
            shakeT = Math.max(shakeT, 0.25); SFX.bang(); die("arrow", Math.sign(p.x - m.x) || 1); p.vy = 14;
          }
        }
        // Timsah: jump over its water and, after a 0.25 s bubble burst, it snaps up 1.5 tiles (bite)
        for (const c of crocs) {
          const rest = c.y + 0.72;
          if (c.st === "wait" && play && !p.onGround && Math.abs(p.x - c.x) < 1.6 && p.y - HH > c.y + 0.9 && p.y - HH < c.y + 5) {
            c.st = "burst"; c.t = 0; if (onScreen(c.x)) { noise(0.25, "lowpass", 900, 200, 0.3); tone("sine", 300, 600, 0.2, 0.05); }
          }
          c.t += dt;
          let y = rest + Math.sin(lt * 2 + c.x) * 0.02, open = 0;
          if (c.st === "burst") {
            y += Math.sin(lt * 60) * 0.03;
            if (c.t >= 0.25) { c.st = "snap"; c.t = 0; SFX.whoosh(0.6); }
          } else if (c.st === "snap") {
            const T = c.t;
            if (T < 0.15) { y = rest + 1.58 * (T / 0.15); open = 0.5; }
            else if (T < 0.45) { y = rest + 1.58; open = Math.max(0, 0.5 - (T - 0.15) * 6); }
            else if (T < 0.8) y = rest + 1.58 * (1 - (T - 0.45) / 0.35);
            else { c.st = "rest"; c.t = 0; }
            if (T >= 0.15 && T - dt < 0.15 && onScreen(c.x)) { SFX.chatter(); tone("square", 220, 90, 0.1, 0.12); }
            const top = y + 0.2, bot = c.y + 0.8;
            if (play && T < 0.6 && top > bot && overlap(p.x, p.y, HW, HH, c.x, (top + bot) / 2, 0.36, (top - bot) / 2)) {
              SFX.chatter(); SFX.click(); shakeT = Math.max(shakeT, 0.3); die("spike");
            }
          } else if (c.st === "rest" && c.t > 1.2) { c.st = "wait"; c.t = 0; }
          c.mesh.position.y = y;
          c.mesh.userData.jaws[0].rotation.z = open; c.mesh.userData.jaws[1].rotation.z = -open;
          const fast = c.st === "burst";
          c.bubs.forEach((b, k) => {
            const ph = (lt * (fast ? 4 : 0.6) + k * 0.33) % 1;
            b.position.set(c.x - 0.25 + k * 0.25 + Math.sin(lt * 5 + k) * 0.04, c.y + 0.82 + ph * (fast ? 0.6 : 0.3), 0.36);
            b.scale.setScalar(fast ? 1.6 : 1); b.visible = c.st === "wait" || fast;
          });
        }
        // Yükselen Lağım: once she enters the dip the sewage rises 1.2 tiles over 2.5 s, then sinks back (water)
        for (const s of sewers) {
          const inside = play && p.x > s.x0 && p.x < s.x1 && p.y - HH < s.cy + 1.2;
          if (s.st === "idle" && inside) { s.st = "rise"; s.t = 0; s.gl = 0; }
          if (s.st === "rise") {
            s.t += dt; s.lvl = 0.1 + 1.2 * Math.min(1, s.t / 2.5); s.gl -= dt;
            if (s.gl <= 0 && onScreen(s.x0)) { s.gl = 0.5; noise(0.3, "lowpass", 500, 120, 0.25); tone("sine", 120, 220, 0.15, 0.05); }
            if (s.t >= 2.5) { s.st = "sink"; s.t = 0; }
          } else if (s.st === "sink") {
            s.t += dt; s.lvl = 1.3 - 1.2 * Math.min(1, s.t / 1.5);
            if (s.t >= 1.5) { s.st = "idle"; s.lvl = 0.1; }
          }
          s.parts.forEach(([body, top]) => {
            body.scale.y = s.lvl; body.position.y = s.cy + s.lvl / 2;
            top.position.y = s.cy + s.lvl + Math.sin(lt * 3 + body.position.x) * 0.015;
          });
          if (play && s.st !== "idle" && p.x + HW * 0.5 > s.x0 && p.x - HW * 0.5 < s.x1 && p.y - HH < s.cy + s.lvl - 0.3) die("water");
        }
        // Damlayan Boru: a toxic drop swells at the nozzle and falls every 1.4 s
        for (const pp of pipes) {
          pp.t += dt;
          pp.mesh.userData.drip.scale.setScalar(0.3 + 0.9 * Math.min(1, pp.t / 1.4));
          if (pp.t >= 1.4) {
            pp.t -= 1.4;
            const m = circle(0.08, KN.tox, pp.x, pp.y, 2.2); level.add(m);
            drops.push({ x: pp.x, y: pp.y, vy: 0, mesh: m });
            if (onScreen(pp.x)) { tone("sine", 1500, 600, 0.09, 0.05); tone("sine", 900, 400, 0.06, 0.03, 0.05); }
          }
        }
        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          d.vy = Math.max(d.vy - GRAV * dt, -18); d.y += d.vy * dt;
          d.mesh.position.y = d.y; d.mesh.scale.y = 1 + Math.min(0.6, -d.vy * 0.05);
          let gone = d.y < -3;
          if (play && overlap(p.x, p.y, HW, HH, d.x, d.y, 0.07, 0.1)) { noise(0.3, "highpass", 5000, 2500, 0.2); die("spike"); gone = true; }
          else if (solid(Math.floor(d.x), Math.floor(d.y - 0.08))) { gone = true; if (onScreen(d.x)) noise(0.06, "highpass", 4000, 2000, 0.08); }
          if (gone) { level.remove(d.mesh); drops.splice(i, 1); }
        }
        // Dönen Pervane: spins 1.45 s, winds down 0.25 s, stands still 0.8 s (a click 0.15 s before it starts again); spinning = cut in two
        for (const f of fanBlades) {
          const pt = f.t; f.t = (f.t + dt) % 2.5;
          const T = f.t, spin = T < 0.15 ? 28 * (T / 0.15) : T < 1.45 ? 28 : T < 1.7 ? 28 * ((1.7 - T) / 0.25) : 0;
          f.bl.rotation.z -= spin * dt;
          const near = onScreen(f.x);
          if (pt < 1.7 && T >= 1.7 && near) SFX.tick();
          if (pt < 2.35 && T >= 2.35 && near) SFX.click();
          f.wr -= dt;
          if (spin > 3 && f.wr <= 0) { f.wr = 0.1; if (near) noise(0.1, "bandpass", 500 + spin * 20, 400, 0.05); }
          if (play && spin > 3 && overlap(p.x, p.y, HW, HH, f.x, f.y + 0.36, 0.3, 0.32)) { SFX.crash(); die("saw", Math.sign(p.x - f.x) || 1); }
        }
        // Lağım Faresi Kralı: within 7 tiles it hops 3 arcs (1 tile high) at her, then one long hop back home and a rest; touch = bite
        for (const k of ratKings) {
          if (k.st === "wait") {
            if (play && Math.abs(p.x - k.x) < 7 && Math.abs(p.y - HH - k.y) < 2) {
              k.st = "pause"; k.t = 0.2; k.n = 0; k.back = false; k.dir = Math.sign(p.x - k.x) || -1;
              if (onScreen(k.x)) { SFX.squeak(); tone("sawtooth", 260, 180, 0.2, 0.05); }
            }
          } else if (k.st === "pause") {
            k.t -= dt;
            if (k.t <= 0) {
              let nx = k.x + k.dir * 1.3;
              if (!k.back && (k.n >= 3 || !solid(Math.floor(nx), k.y - 1) || solid(Math.floor(nx), k.y))) k.back = true; // done, or no floor ahead
              if (k.back) nx = k.hx;
              if (k.back && Math.abs(k.hx - k.x) < 0.05) { k.st = "rest"; k.t = 1.2; k.mesh.scale.x = -2.2; }
              else {
                k.st = "hop"; k.t = 0; k.sx = k.x; k.ex = nx; k.dur = k.back ? 0.8 : 0.45;
                k.mesh.scale.x = (Math.sign(nx - k.x) || -1) * 2.2; if (onScreen(k.x)) SFX.squeak();
              }
            }
          } else if (k.st === "hop") {
            k.t += dt; const u = Math.min(1, k.t / k.dur);
            k.x = k.sx + (k.ex - k.sx) * u; k.hy = 4 * u * (1 - u);
            if (u >= 1) {
              k.hy = 0; k.st = "pause"; k.t = 0.22; if (!k.back) k.n++;
              if (onScreen(k.x)) { noise(0.12, "lowpass", 600, 120, 0.22); if (Math.abs(p.x - k.x) < 4) shakeT = Math.max(shakeT, 0.06); }
            }
          } else if (k.st === "rest") { k.t -= dt; if (k.t <= 0) k.st = "wait"; }
          k.mesh.position.x = k.x; k.mesh.position.y = k.y + k.hy;
          k.mesh.userData.legs.forEach((l, j) => { l.position.y = 0.03 + (k.st === "hop" ? 0.03 * (j ? 1 : -1) : 0); });
          if (play && overlap(p.x, p.y, HW, HH, k.x, k.y + k.hy + 0.26, 0.34, 0.24)) { SFX.squeak(); SFX.chatter(); shakeT = Math.max(shakeT, 0.25); die("spike"); }
        }
      }

      /* ===== Update: Fabrika traps ===== */
      function updateFabrika(dt) {
        const play = state === "play";
        // Hidrolik Pres: 0.4 s hiss with flashing stripes, then the head slams to the floor (squash), holds 0.3 s, rises
        for (const pr of presses) {
          const pt = pr.t; pr.t = (pr.t + dt) % 2;
          const near = Math.abs(p.x - pr.x) < 9, T = pr.t, rest = pr.y + 2.5;
          if (pt < 1.6 && T >= 1.6 && near) { noise(0.4, "highpass", 6500, 4000, 0.18); tone("sine", 2600, 2200, 0.4, 0.015); }
          if (T < pt && near) { SFX.bang(); if (Math.abs(p.x - pr.x) < 6) shakeT = Math.max(shakeT, 0.18); }
          let hb = rest;
          if (T < 0.1) hb = rest - 2.5 * (T / 0.1) * (T / 0.1); else if (T < 0.4) hb = pr.y; else if (T < 1) hb = pr.y + 2.5 * ((T - 0.4) / 0.6);
          const hiss = T >= 1.6;
          pr.head.position.y = hb + (hiss ? Math.sin(lt * 60) * 0.015 : 0);
          pr.yel.color.setHex(hiss ? (Math.floor(lt * 12) % 2 ? 0xffe14a : 0x2a2208) : 0x9a7c16);
          if (play && T < 0.4 && Math.abs(p.x - pr.x) < 0.45 + HW && hb < p.y + HH - 0.05) die("squash");
        }
        // Kaynak Robotu: the arm swings ±0.42 rad over 1.8 s; its spark beam (torch tip to floor) burns; jump it
        for (const w of welders) {
          w.t = (w.t + dt) % 1.8;
          const th = 0.42 * Math.sin((w.t / 1.8) * Math.PI * 2);
          w.arm.rotation.z = th;
          const tx = w.x + 2.75 * Math.sin(th), ty = w.py - 2.75 * Math.cos(th), h = Math.max(0.05, ty - w.y);
          w.beam.position.set(tx, w.y + h / 2, 2.3); w.beam.scale.set(0.7 + Math.random() * 0.6, h, 1);
          w.glow.position.set(tx, w.y + 0.05, 2.31); w.glow.scale.setScalar(0.8 + Math.random() * 0.5);
          w.sparks.forEach((s) => s.position.set(tx + (Math.random() - 0.5) * 0.6, w.y + Math.random() * 0.5, 2.32));
          w.cr -= dt;
          if (w.cr <= 0) { w.cr = 0.12; if (onScreen(w.x)) noise(0.08, "highpass", 5000, 3000, 0.05); }
          if (play && overlap(p.x, p.y, HW, HH, tx, w.y + h / 2, 0.1, h / 2)) { SFX.zap(); die("burn"); }
        }
        // Kesici Lazer Kapısı: low beam on for 0.9 s, then the high beam for 0.9 s; the incoming beam flickers faintly 0.15 s first
        for (const L of lasers) {
          const pt = L.t; L.t = (L.t + dt) % 1.8;
          const lowOn = L.t < 0.9;
          if ((pt < 0.9) !== lowOn && onScreen(L.x)) tone("square", 1900, 1300, 0.07, 0.03);
          L.beams.forEach((b, i) => {
            const on = (i === 0) === lowOn, soon = !on && (L.t % 0.9) > 0.75;
            b.core.opacity = on ? 0.8 + Math.random() * 0.2 : soon && Math.random() < 0.5 ? 0.3 : 0.06;
            b.glowM.opacity = on ? 0.2 + Math.random() * 0.12 : 0;
          });
          if (play && overlap(p.x, p.y, HW, HH, L.x, L.y + (lowOn ? 0.22 : 1.15), 0.6, 0.03)) { SFX.zap(); die("saw", p.vx < 0 ? -1 : 1); }
        }
        // Düşen Kasa Vinci: the trolley shuttles the crate; directly below it creaks 0.3 s, then drops it (squash); it lands as a solid block
        for (const k of cranes) {
          if (k.st === "move") {
            k.tx += k.dir * 1.6 * dt;
            if (k.tx > k.x + 2.5) { k.tx = k.x + 2.5; k.dir = -1; } else if (k.tx < k.x - 2.5) { k.tx = k.x - 2.5; k.dir = 1; }
            if (play && Math.abs(p.x - k.tx) < 0.45 && p.y - HH < k.cyc - 0.5 && p.y > k.y) {
              k.st = "creak"; k.t = 0; k.sx = k.tx; k.ex = Math.floor(k.tx) + 0.5;
              tone("sawtooth", 140, 95, 0.3, 0.06); tone("triangle", 420, 300, 0.28, 0.04);
            }
          } else if (k.st === "creak") {
            k.t += dt; k.tx = k.sx + (k.ex - k.sx) * Math.min(1, k.t / 0.3);
            k.crate.rotation.z = Math.sin(k.t * 50) * 0.05;
            if (k.t >= 0.3) { k.st = "drop"; k.vy = 0; k.crate.rotation.z = 0; SFX.click(); }
          } else if (k.st === "drop") {
            k.vy = Math.max(k.vy - GRAV * dt, -20); k.cyc += k.vy * dt;
            if (play && overlap(p.x, p.y, HW, HH, k.tx, k.cyc, 0.47, 0.47)) { SFX.bang(); die("squash"); }
            const col = Math.floor(k.tx), fy = Math.floor(k.cyc - 0.5);
            if (solid(col, fy)) {
              k.cyc = fy + 1.5; k.st = "landed"; crateBlocks[col + "," + (fy + 1)] = true;
              if (onScreen(k.tx)) { SFX.bang(); shakeT = Math.max(shakeT, 0.2); }
            } else if (k.cyc < -3) { k.st = "gone"; k.crate.visible = false; }
          }
          k.trolley.position.x = k.tx;
          k.crate.position.set(k.tx, k.cyc, 2.2);
          const top = k.y + 4.05, bot = k.st === "move" || k.st === "creak" ? k.cyc + 0.48 : k.y + 3.6, len = Math.max(0.05, top - bot);
          k.cable.position.set(k.tx, bot + len / 2, 1.44); k.cable.scale.y = len;
        }
        // Dişli Çark Platformu: stand on top and it carries her right at 2 tiles/s; touching the teeth from the side = cut
        for (const g of gears) {
          g.mesh.rotation.z -= (2 / g.R) * dt;
          if (!play) continue;
          const top = g.y + g.R + 0.17, bot = p.y - HH;
          if (p.vy <= 0 && Math.abs(p.x - g.x) < g.R + HW + 0.18 && bot <= top + 0.05 && bot >= top - 0.45) {
            p.y = top + HH; p.vy = 0; p.onGround = true; p.x += 2 * dt;
          } else {
            const nx = Math.max(p.x - HW, Math.min(g.x, p.x + HW)), ny = Math.max(bot, Math.min(g.y, p.y + HH));
            if (Math.hypot(nx - g.x, ny - g.y) < g.R + 0.12) { SFX.crash(); die("saw", Math.sign(p.x - g.x) || 1); }
          }
        }
        // Kıvılcım Yağmuru: 2.4 s cycle; sparks rain over 2 tiles for 1 s, then 1.4 s off, the last 0.3 s a rising whine
        for (const s of sparkers) {
          const pt = s.t; s.t = (s.t + dt) % 2.4;
          const T = s.t, on = T < 1, whine = T >= 2.1, near = onScreen(s.x);
          if (pt < 2.1 && whine && near) { tone("sawtooth", 700, 2600, 0.3, 0.04); tone("square", 1400, 3200, 0.3, 0.015); }
          s.disc.rotation.z -= (on ? 40 : whine ? 25 : 2) * dt;
          s.glow.visible = on || (whine && Math.random() < 0.5); s.glow.scale.setScalar(0.8 + Math.random() * 0.5);
          for (const k of s.sp) {
            k.m.visible = on;
            if (!on) continue;
            const f = (lt * 2.2 + k.ph) % 1;
            k.m.position.set(s.x + k.dx * (0.3 + f * 0.7) + (Math.random() - 0.5) * 0.1, s.y + 3.2 - f * 3.2, 2.32);
          }
          s.cr -= dt;
          if (on && s.cr <= 0) { s.cr = 0.1; if (near) noise(0.09, "highpass", 5500, 3000, 0.06); }
          if (play && on && overlap(p.x, p.y, HW, HH, s.x, s.y + 1.6, 0.95, 1.6)) { SFX.zap(); die("burn"); }
        }
        // Eğimli Rampa Varili: every 2.5 s (she within 14 tiles) a barrel rolls down the ramp and on along the floor to the left
        for (const r of ramps) {
          r.t += dt;
          if (r.t >= 2.5) {
            r.t -= 2.5;
            if (play && Math.abs(p.x - r.x) < 14) {
              const m = new THREE.Group(); m.add(circle(0.28, XT.barrel)); m.add(circle(0.2, XT.barrelD, 0, 0, 0.01)); m.add(box(0.56, 0.06, XT.band, 0, 0, 0.02)); m.add(box(0.06, 0.56, XT.band, 0, 0, 0.02));
              level.add(m); r.list.push({ st: "slope", u: 0, x: r.x + 1.3, y: r.y, vx: 0, vy: 0, dist: 0, mesh: m });
              if (onScreen(r.x)) { SFX.click(); noise(0.4, "lowpass", 500, 150, 0.15); }
            }
          }
          for (let i = r.list.length - 1; i >= 0; i--) {
            const b = r.list[i]; let gone = false;
            if (b.st === "slope") {
              b.u = Math.min(1, b.u + dt / 0.5); b.x = r.x + 1.3 - 1.8 * b.u * b.u; b.y = r.y + 1.3 * ((b.x - (r.x - 0.5)) / 2);
              if (b.u >= 1) { b.st = "roll"; b.y = r.y; b.vx = -5.5; }
            } else {
              const res = floorPhys(b, 0.28, dt); b.dist += Math.abs(b.vx * dt);
              b.rt = (b.rt || 0) - dt; if (b.rt <= 0) { b.rt = 0.2; if (onScreen(b.x)) noise(0.15, "lowpass", 400, 150, 0.1); }
              if (res === "wall" || res === "gone" || res === "water" || b.dist > 16) {
                gone = true;
                if (onScreen(b.x)) { if (res === "water") SFX.splash(); else if (res === "wall") { SFX.crash(); shakeT = Math.max(shakeT, 0.08); } }
              }
            }
            b.mesh.position.set(b.x, b.y + 0.28, 1.9); b.mesh.rotation.z += (b.st === "roll" ? 5.5 : 4) * dt / 0.28;
            if (!gone && play && overlap(p.x, p.y, HW, HH, b.x, b.y + 0.28, 0.25, 0.25)) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", -1); }
            if (gone) { level.remove(b.mesh); r.list.splice(i, 1); }
          }
        }
      }

      /* ===== Update: Buzhane traps ===== */
      function iceShards(x, y, n, mat) {
        for (let k = 0; k < n; k++) {
          const g = box(rnd(0.05, 0.12), rnd(0.05, 0.12), mat); g.position.set(x + rnd(-0.2, 0.2), y + rnd(0, 0.3), 0);
          addBit(g, { vx: rnd(-3, 3), vy: rnd(2, 6), spin: rnd(-10, 10), life: 0.8, fade: true, z: 2.3 });
        }
      }
      function updateBuzhane(dt) {
        const play = state === "play";
        // Buz Sarkıtı: same bait as V: approaching with the front edge within 0.9 tiles (or under it), a 0.08 s crack, then a fast fall
        for (const ic of icicles) {
          if (ic.st === "idle" && play && p.y < ic.y) {
            const dx = ic.x - p.x, side = Math.sign(dx), toward = side !== 0 && Math.abs(p.vx) > 0.1 && Math.sign(p.vx) === side;
            if (Math.abs(dx) < 0.5 || (toward && Math.abs(dx) - HW <= 0.9)) {
              ic.st = "warn"; ic.t = 0.08; shakeT = Math.max(shakeT, 0.08);
              tone("triangle", 2600, 1700, 0.08, 0.05); noise(0.08, "highpass", 6000, 4000, 0.12);
            }
          }
          if (ic.st === "warn") {
            ic.t -= dt; ic.mesh.position.x = ic.x + Math.sin(ic.t * 90) * 0.05;
            if (ic.t <= 0) { ic.st = "fall"; ic.vy = -10; ic.mesh.position.x = ic.x; }
          }
          if (ic.st === "fall") {
            ic.vy -= 120 * dt; ic.y += ic.vy * dt;
            if (solid(Math.floor(ic.x), Math.floor(ic.y - 0.85))) {
              ic.st = "gone"; ic.mesh.visible = false; iceShards(ic.x, Math.floor(ic.y - 0.85) + 1, 7, BZ.ice);
              if (onScreen(ic.x)) { noise(0.25, "highpass", 5000, 2500, 0.2); tone("sine", 3200, 2600, 0.12, 0.03); }
            } else if (ic.y < -3) ic.st = "gone";
          }
          ic.mesh.position.y = ic.y;
          if (play && (ic.st === "idle" || ic.st === "warn" || ic.st === "fall") && overlap(p.x, p.y, HW, HH, ic.x, ic.y - 0.45, 0.14, 0.4)) die("spike");
        }
        // Penguen Kızağı: within 6 tiles it flops onto its belly and slides at her fast (knocked flying); jump it
        for (const g of penguins) {
          if (g.st === "wait") {
            if (play && Math.abs(p.x - g.x) < 6 && Math.abs(p.y - HH - g.y) < 1.5) { g.st = "slide"; g.dir = Math.sign(p.x - g.x) || -1; g.mesh.scale.x = g.dir; g.vx = g.dir * 4; SFX.squeak(); SFX.whoosh(0.5); }
            else { g.mesh.rotation.z = Math.sin(lt * 3 + g.x) * 0.04; continue; }
          }
          if (g.st === "slide") {
            g.vx = g.dir * Math.min(10, Math.abs(g.vx) + 22 * dt);
            const r = floorPhys(g, 0.45, dt); g.dist += Math.abs(g.vx * dt);
            g.mesh.rotation.z = Math.sin(lt * 30) * 0.03;
            g.sq -= dt; if (g.sq <= 0 && onScreen(g.x)) { g.sq = 0.08; iceShards(g.x - g.dir * 0.4, g.y, 1, BZ.snow); }
            if (play && overlap(p.x, p.y, HW, HH, g.x, g.y + 0.2, 0.42, 0.2)) { shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", g.dir); }
            if (r === "wall") { g.st = "stop"; SFX.bang(); if (onScreen(g.x)) { shakeT = Math.max(shakeT, 0.1); iceShards(g.x, g.y + 0.3, 6, BZ.snow); } g.mesh.rotation.z = g.dir * 0.3; }
            else if (r === "water") { g.st = "sink"; if (onScreen(g.x)) SFX.splash(); }
            else if (r === "gone" || g.dist > 40) { g.st = "stop"; g.mesh.visible = false; }
          } else if (g.st === "sink") { g.y -= 0.6 * dt; g.mesh.position.z = 0.2; if (g.y < -2) { g.st = "stop"; g.mesh.visible = false; } }
          g.mesh.position.x = g.x; g.mesh.position.y = g.y;
        }
        // Kartopu Yuvarlanan: within 9 tiles it rolls at her, growing from 0.5 to 1.5 tiles across over its first 5 tiles
        for (const s of snowballs) {
          if (s.st === "wait") {
            if (play && Math.abs(p.x - s.x) < 9 && Math.abs(p.y - HH - s.y) < 1.5) { s.st = "roll"; s.dir = Math.sign(p.x - s.x) || -1; noise(0.3, "lowpass", 600, 300, 0.12); }
            else continue;
          }
          if (s.st === "roll") {
            s.vx = s.dir * Math.min(6, Math.abs(s.vx) + 10 * dt);
            const r = floorPhys(s, s.r, dt); s.dist += Math.abs(s.vx * dt);
            s.r = 0.25 + 0.5 * Math.min(1, s.dist / 5);
            s.mesh.rotation.z -= (s.vx * dt) / s.r;
            if (Math.random() < dt * 10 && onScreen(s.x)) iceShards(s.x - s.dir * s.r, s.y, 1, BZ.snow);
            if (play && Math.hypot(Math.max(p.x - HW, Math.min(s.x, p.x + HW)) - s.x, Math.max(p.y - HH, Math.min(s.y + s.r, p.y + HH)) - s.y - s.r) < s.r * 0.9) {
              shakeT = Math.max(shakeT, 0.2); SFX.bang(); die("arrow", s.dir);
            }
            if (r === "wall" || r === "gone" || s.dist > 40) {
              s.st = "gone"; s.mesh.visible = false;
              if (r === "wall" && onScreen(s.x)) { iceShards(s.x, s.y + s.r, 10, BZ.snow); noise(0.2, "lowpass", 900, 300, 0.2); shakeT = Math.max(shakeT, 0.1); }
            } else if (r === "water") s.st = "sink";
          }
          if (s.st === "sink") { s.y -= 0.8 * dt; s.r = Math.max(0.05, s.r - 0.3 * dt); if (s.y < -3) s.st = "gone"; }
          s.mesh.scale.setScalar(s.r); s.mesh.position.set(s.x, s.y + s.r, s.st === "sink" ? 0.2 : 1.9);
        }
        // Donduran Fan: 3 s cycle; 0.4 s whoosh tell, then 1.5 s of icy wind over 7 tiles, pushing her 4 tiles/s
        windPush = 0;
        for (const f of fans) {
          f.t += dt;
          const ph = f.t % 3, blow = ph >= 1.5, tell = ph >= 1.1 && !blow;
          if (tell && !f.tell && onScreen(f.x)) { SFX.whoosh(0.6); noise(0.4, "highpass", 2500, 5000, 0.08); }
          f.tell = tell;
          f.spin += ((blow ? 30 : tell ? 14 : 1.5) - f.spin) * Math.min(1, dt * 6);
          f.blades.rotation.z -= f.d * f.spin * dt;
          if (!blow) continue;
          if (onScreen(f.x) && Math.random() < dt * 35) {
            const m = circle(rnd(0.03, 0.07), Math.random() < 0.5 ? BZ.snow : BZ.iceL); m.position.set(f.x + f.d * 0.75, f.y + rnd(0.3, 2), 0);
            addBit(m, { vx: f.d * rnd(6, 9), vy: rnd(-0.6, 0.4), g: 0, spin: rnd(-6, 6), life: 0.9, fade: true, z: 2.4 });
          }
          const rel = (p.x - f.x) * f.d;
          if (play && rel > 0 && rel < 7.5 && p.y - HH > f.y - 0.3 && p.y - HH < f.y + 2.6) windPush = f.d * 4;
        }
        // Kırılan Buz Köprü: the slab shows its cracks the moment she steps on it, then (0.4 s later) drops into the water
        for (const k in fakes) {
          const f = fakes[k]; if (!f.ice) continue;
          if (f.timer >= 0 && !f.cracks.visible) {
            f.cracks.visible = true; shakeT = Math.max(shakeT, 0.05);
            tone("triangle", 2400, 1500, 0.07, 0.05); noise(0.1, "highpass", 5000, 3000, 0.12);
          }
          if (f.fallen && !f.splashed && f.mesh.position.y < f.y0 - 0.8) {
            f.splashed = true; iceShards(f.mesh.position.x, f.y0 - 0.5, 5, BZ.ice);
            if (onScreen(f.mesh.position.x)) noise(0.35, "lowpass", 2500, 300, 0.2);
          }
        }
        // Buz Küpü Pres: 2.2 s cycle; 0.3 s creak and shiver, then the blocks slam together over the gap (caught = squash), shut 0.6 s
        for (const q of icePresses) {
          q.t += dt;
          const ph = q.t % 2.2, shut = ph >= 1.6, tell = ph >= 1.3 && !shut;
          if (tell && !q.tell && onScreen(q.x)) { SFX.creak(); tone("sawtooth", 260, 190, 0.3, 0.04); }
          q.tell = tell;
          const pk = q.k; q.k = Math.max(0, Math.min(1, q.k + (shut ? dt / 0.12 : -dt / 0.25)));
          if (pk < 1 && q.k >= 1 && onScreen(q.x)) { noise(0.25, "lowpass", 1200, 200, 0.35); iceShards(q.x, q.y + 1.9, 6, BZ.ice); shakeT = Math.max(shakeT, 0.08); }
          const off = 0.95 * (1 - q.k), jit = tell ? Math.sin(lt * 80) * 0.03 : 0;
          q.L.position.x = q.x - 0.5 - off + jit; q.R.position.x = q.x + 0.5 + off - jit;
          if (play && q.k >= 0.3 && Math.abs(p.x - q.x) < 0.5 + HW && p.y - HH < q.y + 1.9) {
            if (shut && pk < 1) { p.x = q.x; p.vx = 0; SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("squash"); }
            else { p.x = p.x < q.x ? q.x - 0.5 - HW - 0.001 : q.x + 0.5 + HW + 0.001; p.mvx = 0; }
          }
        }
      }

      /* ===== Update: Metro Tüneli traps ===== */
      function updateMetro(dt) {
        updateDroppers("sign", dt);
        const play = state === "play";
        // Metro Treni: 3.5 s cycle; the last 0.8 s headlights glow and the rails rattle, then the train rushes through right to left
        for (const tr of trains) {
          const pt = tr.t % 3.5; tr.t += dt;
          const ph = tr.t % 3.5, len = 6, dur = (tr.x1 - tr.x0 + len) / 26, tell = ph >= 2.7, run = ph < dur;
          const near = onScreen(tr.x0) || onScreen(tr.x1);
          if (tell && pt < 2.7 && near) { tone("sawtooth", 330, 322, 0.55, 0.04); tone("sawtooth", 415, 405, 0.55, 0.03); }
          if (ph < pt && near) { SFX.whoosh(1); noise(0.6, "lowpass", 600, 120, 0.4); shakeT = Math.max(shakeT, 0.15); }
          tr.glow.opacity = tell ? ((ph - 2.7) / 0.8) * (0.8 + Math.random() * 0.2) : run ? Math.max(0, 1 - ph / 0.25) : 0;
          tr.rails.position.y = tell || run ? (Math.random() - 0.5) * 0.04 : 0;
          if (tell || run) {
            tr.rt -= dt;
            if (tr.rt <= 0 && near) { tr.rt = tell ? 0.09 : 0.06; noise(0.06, "highpass", 3500, 2000, run ? 0.12 : 0.04 + 0.08 * ((ph - 2.7) / 0.8)); }
          }
          tr.mesh.visible = run;
          if (!run) continue;
          const fx = tr.x1 - 26 * ph;
          tr.mesh.position.set(fx, tr.y + Math.abs(Math.sin(lt * 40)) * 0.02, 1.2);
          for (const s of tr.segs) { const sx = fx + s.position.x; s.visible = sx > tr.x0 && sx < tr.x1; }
          const lo = Math.max(fx, tr.x0), hi = Math.min(fx + len, tr.x1);
          if (play && hi > lo && p.x + 0.1 > lo && p.x - 0.1 < hi && p.y - HH < tr.y + 1.9 && p.y + HH > tr.y) {
            shakeT = Math.max(shakeT, 0.3); SFX.bang(); die("arrow", -1);
          }
        }
        // Elektrikli Üçüncü Ray: sparks now and then with a low hum; touching it = burn
        railHum -= dt;
        for (const r of thirdRails) {
          r.t -= dt; r.gm.opacity *= Math.max(0, 1 - dt * 8);
          if (r.t <= 0) {
            r.t = rnd(0.4, 1.8); r.gm.opacity = 0.5;
            if (onScreen(r.x)) {
              for (let k = 0; k < 3; k++) { const m = circle(rnd(0.02, 0.04), MT.spark); m.position.set(r.x + rnd(-0.4, 0.4), r.y + 0.22, 0); addBit(m, { vx: rnd(-2, 2), vy: rnd(1, 3), life: 0.35, z: 2.5 }); }
              if (Math.abs(p.x - r.x) < 6) noise(0.06, "highpass", 5000, 3000, 0.04);
            }
          }
          if (railHum <= 0 && Math.abs(p.x - r.x) < 5) { railHum = 0.5; tone("sawtooth", 60, 60, 0.45, 0.012); }
          if (play && overlap(p.x, p.y, HW, HH, r.x, r.y + 0.11, 0.5, 0.11)) { SFX.zap(); die("burn"); }
        }
        // Kapanan Vagon Kapısı: 3 s cycle; 0.5 s ding-dong, then the doors shut for 1.2 s (caught = squash, closed = wall)
        for (const q of mdoors) {
          q.t += dt;
          const ph = q.t % 3, shut = ph >= 1.8, tell = ph >= 1.3 && !shut;
          if (tell && !q.tell && onScreen(q.x)) { tone("sine", 660, 660, 0.3, 0.07); tone("sine", 523, 523, 0.45, 0.07, 0.25); }
          q.tell = tell;
          const pk = q.k; q.k = Math.max(0, Math.min(1, q.k + (shut ? dt / 0.15 : -dt / 0.3)));
          if (pk < 1 && q.k >= 1 && onScreen(q.x)) { noise(0.15, "lowpass", 1500, 300, 0.25); tone("square", 140, 90, 0.08, 0.05); shakeT = Math.max(shakeT, 0.05); }
          q.lamp.color.setHex(shut ? 0xff3a2a : tell ? (Math.floor(lt * 8) % 2 ? 0xffb020 : 0x3a2a10) : 0x2a8a3a);
          const off = 0.5 * (1 - q.k);
          q.L.position.x = q.x - 0.25 - off; q.R.position.x = q.x + 0.25 + off;
          if (play && q.k >= 0.3 && Math.abs(p.x - q.x) < 0.5 + HW && p.y - HH < q.y + 2.9) {
            if (shut && pk < 1) { p.x = q.x; p.vx = 0; SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("squash"); }
            else { p.x = p.x < q.x ? q.x - 0.5 - HW - 0.001 : q.x + 0.5 + HW + 0.001; p.mvx = 0; }
          }
        }
        // Yürüyen Merdiven: steps ride at 3 tiles/s (the push itself comes from beltDirs); a soft motor hum near it
        for (const e of escalators) {
          const off = lt * 3 * e.dir, wrap = (v) => ((v % e.n) + e.n) % e.n;
          e.steps.forEach((s, k) => { s.position.x = e.l + wrap(k / 2 + off); });
          e.rt -= dt;
          if (e.rt <= 0) { e.rt = 0.4; const dist = Math.abs(p.x - (e.l + e.n / 2)); if (dist < 8) tone("sine", 90, 88, 0.35, 0.02 * (1 - dist / 8)); }
        }
        // Turnike: 1.5 s cycle; still, then a 0.3 s click tell, then the arm spins hard for 0.5 s (knocked flying)
        for (const q of turnstiles) {
          q.t += dt;
          const ph = q.t % 1.5, tell = ph >= 0.7 && ph < 1.0, spin = ph >= 1.0;
          if (tell && !q.tell && onScreen(q.x)) SFX.click();
          if (spin && !q.spin && onScreen(q.x)) SFX.whoosh(0.4);
          q.tell = tell; q.spin = spin;
          q.arm.rotation.z += spin ? -dt * 28 : tell ? Math.sin(lt * 60) * 0.02 : 0;
          q.lamp.color.setHex(spin ? 0xff3a2a : tell ? 0xffb020 : 0x2a8a3a);
          if (play && spin && Math.abs(p.x - q.x) < 0.6 + HW && p.y - HH < q.y + 1.45 && p.y + HH > q.y + 0.3) {
            shakeT = Math.max(shakeT, 0.3); SFX.bang(); die("arrow", p.x < q.x ? -1 : 1);
          }
        }
        // Sarkan Kablo: live cable on a 1.6 s pendulum, sparking at its broken end; touch = burn
        for (const q of cables) {
          const ph = ((lt + q.ph) / 1.6) * Math.PI * 2;
          q.a = 1.0 * Math.sin(ph); q.mesh.rotation.z = q.a;
          const side = Math.sign(q.a);
          if (side && side !== q.side) { if (q.side && onScreen(q.x)) SFX.whoosh(0.25); q.side = side; }
          const sn = Math.sin(q.a), cs = Math.cos(q.a), tx = q.x + q.L * sn, ty = q.py - q.L * cs;
          q.gm.opacity = Math.max(0.15, q.gm.opacity - dt * 2);
          q.st -= dt;
          if (q.st <= 0) {
            q.st = rnd(0.1, 0.4); q.gm.opacity = 0.8;
            if (onScreen(q.x)) {
              for (let k = 0; k < 2; k++) { const m = circle(rnd(0.02, 0.04), MT.spark); m.position.set(tx, ty, 0); addBit(m, { vx: rnd(-2.5, 2.5), vy: rnd(0.5, 2.5), life: 0.35, z: 2.5 }); }
              if (Math.abs(p.x - q.x) < 6) noise(0.05, "highpass", 5000, 3000, 0.05);
            }
          }
          if (!play) continue;
          for (const o of [0.9, 1.3, 1.7, 2.1, 2.25]) {
            const hx = q.x + o * sn, hy = q.py - o * cs;
            const qx = Math.max(p.x - HW, Math.min(p.x + HW, hx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, hy));
            if (Math.hypot(qx - hx, qy - hy) < 0.12) { shakeT = Math.max(shakeT, 0.2); SFX.zap(); die("burn"); break; }
          }
        }
      }

      /* ===== Update: Kukla'nın Stüdyosu traps (spotlight, marionette hands, fake-applause trapdoor) ===== */
      function updateStudyo(dt) {
        const play = state === "play";
        // Sahne Spot Işığı: directly below it, 0.3 s flicker + chain rattle, then it drops (squash); the wreck stays, harmless
        for (const s of spots) {
          if (s.st === "wait") {
            if (play && Math.abs(p.x - s.x) < 0.45) { s.st = "tell"; s.t = 0; }
          } else if (s.st === "tell") {
            s.t += dt;
            const on = Math.random() < 0.5;
            s.lm.color.setHex(on ? 0xfff2b0 : 0x3a3020); s.cm.opacity = on ? 0.14 : 0.02;
            s.mesh.position.x = s.x + (Math.random() - 0.5) * 0.06;
            s.rt -= dt;
            if (s.rt <= 0 && onScreen(s.x)) { s.rt = 0.05; noise(0.04, "highpass", 4200, 2600, 0.1); tone("square", 1700 + Math.random() * 600, 1100, 0.025, 0.03); }
            if (s.t >= 0.3) {
              s.st = "fall"; s.vy = 0; s.cone.visible = false; s.mesh.position.x = s.x; s.lm.color.setHex(0xfff2b0);
              if (onScreen(s.x)) noise(0.12, "highpass", 3000, 1500, 0.2); // chain snaps
            }
          } else if (s.st === "fall") {
            s.vy -= GRAV * 1.3 * dt; s.py += s.vy * dt;
            if (s.py - 0.26 <= s.y) {
              s.py = s.y + 0.26; s.st = "down"; s.lm.color.setHex(0x3a3020);
              if (onScreen(s.x)) {
                SFX.crash(); shakeT = Math.max(shakeT, 0.15);
                for (let k = 0; k < 8; k++) { const m = circle(rnd(0.03, 0.06), ST.glass); m.position.set(s.x + rnd(-0.3, 0.3), s.y + 0.2, 0); addBit(m, { vx: rnd(-3, 3), vy: rnd(1.5, 4), life: 0.6, z: 2.5 }); }
              }
            }
            s.mesh.position.y = s.py;
            if (play && overlap(p.x, p.y, HW, HH, s.x, s.py + 0.05, 0.38, 0.3)) { SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("squash"); }
          }
        }
        // İp Kuklası Elleri: 2.4 s cycle; 0.4 s string creak with a darkening shadow, then the hands drop and clap (squash)
        for (const q of puppetHands) {
          q.t += dt;
          const ph = q.t % 2.4, tell = ph >= 1.4 && ph < 1.8, down = ph >= 1.8 && ph < 2.15;
          if (tell && !q.tell && onScreen(q.x)) SFX.creak();
          q.tell = tell;
          const pk = q.k; q.k = Math.max(0, Math.min(1, q.k + (down ? dt / 0.15 : ph >= 2.15 ? -dt / 0.25 : -1)));
          if (pk < 1 && q.k >= 1 && onScreen(q.x)) { noise(0.2, "bandpass", 1400, 500, 0.5); tone("square", 260, 110, 0.08, 0.12); shakeT = Math.max(shakeT, 0.12); }
          const jig = tell ? Math.sin(lt * 50) * 0.05 : 0;
          [[q.L, -1], [q.R, 1]].forEach(([h, s]) => {
            const hx = q.x + s * (1.7 - 1.3 * q.k) + jig * s, hy = q.y + 2.9 * (1 - q.k) + 0.02 + Math.abs(jig);
            h.g.position.set(hx, hy, 1.1);
            const top = hy + 1.8, len = q.y + 5.3 - top;
            h.str.position.set(hx, top + len / 2, 0.85); h.str.scale.y = Math.max(0.01, len);
          });
          q.sm.opacity = tell ? 0.15 + 0.3 * (ph - 1.4) / 0.4 : down || q.k > 0 ? 0.45 : 0.12;
          q.shadow.scale.x = 1.1 + 0.6 * (1 - q.k);
          const shut = q.k >= 0.9;
          if (play && shut && Math.abs(p.x - q.x) < 0.8 + HW && p.y - HH < q.y + 1.9) { SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("squash"); }
        }
        // Sahte Alkış Kapanı: 3 s cycle; ALKIŞ lights with a 0.4 s drumroll, then the doors drop open for 1 s (fall = pit death)
        for (const d of tdoors) {
          d.t += dt;
          const ph = d.t % 3, near = onScreen(d.x);
          // stays open while she is inside the hole, so it never shuts on her
          const inHole = d.open && p.x + HW > d.c && p.x - HW < d.e + 1 && p.y - HH < d.y + 1 && p.y + HH > d.y;
          const open = ph >= 2 || inHole, tell = ph >= 1.6 && ph < 2;
          if (tell) { d.rt -= dt; if (d.rt <= 0 && near) { d.rt = 0.035; noise(0.05, "bandpass", 260, 180, 0.06 + 0.12 * (ph - 1.6) / 0.4); } }
          if (open && !d.open && near) { noise(0.5, "highpass", 6000, 3000, 0.22); tone("square", 120, 70, 0.1, 0.08); noise(0.9, "bandpass", 2200, 1400, 0.12); }
          if (!open && d.open && near) { noise(0.12, "lowpass", 900, 200, 0.2); tone("sine", 110, 60, 0.1, 0.1); }
          d.open = open;
          d.k = Math.max(0, Math.min(1, d.k + (open ? dt / 0.1 : -dt / 0.2)));
          d.L.rotation.z = -d.k * Math.PI / 2; d.R.rotation.z = d.k * Math.PI / 2;
          const lit = tell || open;
          d.signM.color.setScalar(lit ? (open || Math.floor(lt * 10) % 2 ? 1 : 0.55) : 0.22);
          d.gm.opacity = open ? 0.55 : tell ? 0.3 : 0;
        }
        // Kamera Vinci: the boom swings the camera on a 2 s pendulum, lowest at head height; hit = knocked flying
        for (const q of camCranes) {
          const ph = ((lt + q.ph) / 2) * Math.PI * 2, a = 1.05 * Math.sin(ph);
          q.mesh.rotation.z = a; q.cam.rotation.z = -a;
          const side = Math.sign(a);
          if (side && side !== q.side) { if (q.side && onScreen(q.x)) SFX.whoosh(0.35); q.side = side; }
          const ex = q.x + q.L * Math.sin(a), ey = q.py - q.L * Math.cos(a);
          if (play && overlap(p.x, p.y, HW, HH, ex, ey + 0.1, 0.4, 0.3)) { shakeT = Math.max(shakeT, 0.3); SFX.bang(); die("arrow", Math.cos(ph) >= 0 ? 1 : -1); }
        }
        // Konfeti Topu: 2 s cycle; 0.3 s fuse sizzle, then a heavy streamer-shot flies horizontally at her
        for (const q of cannons) {
          const pt = q.t % 2; q.t += dt;
          const ph = q.t % 2, near = onScreen(q.x), tell = ph >= 1.7;
          if (!tell) { q.dir = p.x < q.x ? -1 : 1; q.g.scale.x = -q.dir; }
          if (tell) {
            q.fm.opacity = 0.5 + 0.4 * Math.random(); q.rt -= dt;
            if (q.rt <= 0 && near) {
              q.rt = 0.04; noise(0.05, "highpass", 6000, 4000, 0.06);
              const m = circle(rnd(0.02, 0.035), MAT.spark); m.position.set(q.x - q.dir * 0.46, q.y + 0.96, 0); addBit(m, { vx: rnd(-1.5, 1.5), vy: rnd(1, 2.5), life: 0.3, z: 2.5 });
            }
          } else q.fm.opacity = 0;
          if (ph < pt) { // fire
            const m = new THREE.Group(); m.add(circle(0.19, CF.shot, 0, 0, 0));
            CONF.forEach((cm, k) => { const s = box(0.3, 0.06, cm, 0, 0, 0.01); s.rotation.z = k * 0.63; m.add(s); });
            const sx = q.x + q.dir * 0.6; m.position.set(sx, q.y + 0.55, 1.0); level.add(m);
            cshots.push({ x: sx, y: q.y + 0.55, vx: q.dir * 9, d: 0, mesh: m });
            q.kick = 0.15;
            if (near) {
              tone("sine", 180, 60, 0.15, 0.3); noise(0.25, "lowpass", 2500, 200, 0.4);
              for (let k = 0; k < 10; k++) { const b = box(0.08, 0.05, CONF[k % 5]); b.position.set(sx, q.y + 0.6, 0); addBit(b, { vx: q.dir * rnd(1, 4), vy: rnd(1, 4), g: 6, spin: rnd(-10, 10), life: 0.9, z: 2.5 }); }
            }
          }
          q.kick = Math.max(0, q.kick - dt); q.g.position.x = q.x - q.dir * q.kick;
        }
        for (let i = cshots.length - 1; i >= 0; i--) {
          const s = cshots[i];
          s.x += s.vx * dt; s.d += Math.abs(s.vx) * dt; s.mesh.position.x = s.x; s.mesh.rotation.z -= Math.sign(s.vx) * dt * 8;
          if (Math.random() < dt * 15 && onScreen(s.x)) { const b = box(0.07, 0.04, CONF[Math.floor(Math.random() * 5)]); b.position.set(s.x, s.y, 0); addBit(b, { vx: -s.vx * 0.1 + rnd(-1, 1), vy: rnd(0, 2), g: 6, spin: rnd(-8, 8), life: 0.6, z: 2.5 }); }
          if (s.d > 12 || solid(Math.floor(s.x), Math.floor(s.y))) { level.remove(s.mesh); cshots.splice(i, 1); continue; }
          if (play && overlap(p.x, p.y, HW, HH, s.x, s.y, 0.2, 0.18)) { shakeT = Math.max(shakeT, 0.3); SFX.bang(); die("arrow", Math.sign(s.vx)); level.remove(s.mesh); cshots.splice(i, 1); }
        }
        // Sahte Çıkış Kapısı: the sign hums and flickers; touch the door and a boxing glove punches out (knocked flying)
        for (const q of fdoors) {
          q.gm.opacity = Math.random() < 0.02 ? 0.1 : 0.3 + 0.08 * Math.sin(lt * 3 + q.x);
          if (play && !q.hit && overlap(p.x, p.y, HW, HH, q.x, q.y + 0.95, 0.45, 0.95)) {
            q.hit = true; q.dir = p.x < q.x ? -1 : 1;
            tone("square", 220, 880, 0.08, 0.12); SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("arrow", q.dir);
          }
          if (q.hit && q.k < 1) { q.k = Math.min(1, q.k + dt / 0.08); placeGlove(q); }
        }
        // Döner Sahne: 2.5 s cycle; 0.4 s rumble, then the segment flips over in 0.4 s (open: fall into the pit)
        for (const d of turns) {
          d.t += dt;
          const ph = d.t % 2.5, near = onScreen(d.x);
          const inHole = d.open && p.x + HW > d.c && p.x - HW < d.e + 1 && p.y - HH < d.y + 1 && p.y + HH > d.y;
          const flip = ph >= 2.1, tell = ph >= 1.7 && !flip, open = flip || inHole;
          if (tell) { d.rt -= dt; if (d.rt <= 0 && near) { d.rt = 0.05; noise(0.08, "lowpass", 220, 120, 0.08 + 0.14 * (ph - 1.7) / 0.4); } }
          if (open && !d.open && near) { SFX.whoosh(0.5); tone("sawtooth", 90, 50, 0.35, 0.08); }
          if (!open && d.open && near) { noise(0.12, "lowpass", 900, 200, 0.2); tone("sine", 110, 60, 0.1, 0.1); }
          d.open = open;
          const j = tell ? 0.03 : 0;
          d.g.rotation.z = flip ? Math.PI * (ph - 2.1) / 0.4 : 0;
          d.g.position.set(d.x + (Math.random() - 0.5) * j, d.y + 0.85 + (Math.random() - 0.5) * j, 0.05);
        }
        // Perde Kapanı: directly below, a 0.3 s rope slip, then the weighted bar drops (squash); after 1.2 s the curtain hauls back up
        for (const q of curtains) {
          let jx = 0;
          if (q.st === "wait") {
            if (play && Math.abs(p.x - q.x) < 0.6 && p.y < q.by) {
              q.st = "tell"; q.t = 0;
              if (onScreen(q.x)) { tone("sawtooth", 520, 300, 0.3, 0.05); noise(0.3, "bandpass", 1800, 900, 0.1); }
            }
          } else if (q.st === "tell") {
            q.t += dt; jx = (Math.random() - 0.5) * 0.06; q.by = q.rest - 0.25 * q.t; // the rope slips a little
            if (q.t >= 0.3) { q.st = "fall"; q.vy = -2; if (onScreen(q.x)) SFX.whoosh(0.5); }
          } else if (q.st === "fall") {
            q.vy -= GRAV * 1.5 * dt; q.by += q.vy * dt;
            if (play && overlap(p.x, p.y, HW, HH, q.x, q.by, 0.85, 0.14)) { SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("squash"); }
            if (q.by <= q.y + 0.12) {
              q.by = q.y + 0.12; q.st = "down"; q.t = 0;
              if (onScreen(q.x)) { noise(0.3, "lowpass", 900, 120, 0.4); tone("sine", 110, 45, 0.2, 0.2); shakeT = Math.max(shakeT, 0.15); dust(q.x, q.y, 6); }
            }
          } else if (q.st === "down") {
            q.t += dt; if (q.t >= 1.2) { q.st = "up"; if (onScreen(q.x)) SFX.creak(); }
          } else if (q.st === "up") {
            q.by = Math.min(q.rest, q.by + 2.5 * dt);
            if (q.by >= q.rest) { q.st = "wait"; }
          }
          const len = q.top - q.by;
          q.drape.position.set(q.x + jx, q.by + len / 2, 0.86); q.drape.scale.y = len;
          q.bar.position.set(q.x + jx, q.by, 0.95);
          q.rope.position.y = q.by + len / 2; q.rope.scale.y = len;
        }
      }
      function placeGlove(q) { // the glove sits behind the door until it punches out toward her side
        const ext = 0.15 + 1.0 * q.k, gx = q.x + q.dir * ext, z = q.k > 0 ? 0.5 : 0.28, gy = q.y + 0.55;
        q.glove.position.set(gx, gy, z); q.glove.scale.x = q.dir;
        q.arm.position.set((q.x + gx) / 2, gy, z - 0.01); q.arm.scale.x = Math.max(0.01, ext);
      }

      /* ===== Update: Bodrum traps (boiler, shelf, mousetrap, bulb) ===== */
      function updateBodrum(dt) {
        const play = state === "play";
        // Kazan Patlaması: 3 s cycle; 0.6 s shake + whistle, then a 0.6 s steam blast 3 tiles toward her side (burn)
        for (const q of boilers) {
          q.t += dt;
          const ph = q.t % 3, near = onScreen(q.x), tell = ph >= 1.8 && ph < 2.4, blast = ph >= 2.4;
          if (!tell && !blast) q.dir = p.x < q.x ? -1 : 1;
          if (tell && !q.wh && near) { tone("sine", 1500, 2300, 0.6, 0.05); tone("sine", 3000, 4400, 0.6, 0.02); }
          q.wh = tell;
          if (tell && near && Math.random() < dt * 20) { const m = circle(rnd(0.05, 0.1), BD.puff); m.position.set(q.x, q.y + 2, 0); addBit(m, { vx: rnd(-0.5, 0.5), vy: rnd(1, 2), g: 0, life: 0.5, grow: 1.5, z: 1.2 }); }
          const j = tell ? 0.05 : blast ? 0.02 : 0;
          q.g.position.x = q.x + (Math.random() - 0.5) * j * 2;
          q.needle.rotation.z = tell || blast ? -1.3 + Math.random() * 0.3 : 0.7;
          if (blast && !q.on && near) { noise(0.6, "highpass", 3500, 1200, 0.35); noise(0.6, "bandpass", 900, 500, 0.2); shakeT = Math.max(shakeT, 0.1); }
          q.on = blast; q.jet.visible = blast;
          if (!blast) continue;
          const k = Math.min(1, (ph - 2.4) / 0.08);
          q.jet.scale.set(q.dir * k, 0.8 + 0.3 * Math.random(), 1); q.sm.opacity = 0.8 * Math.min(1, (3 - ph) / 0.15);
          const x0 = q.x + q.dir * 0.4, x1 = q.x + q.dir * (0.4 + 3 * k);
          if (play && overlap(p.x, p.y, HW, HH, (x0 + x1) / 2, q.y + 0.45, Math.abs(x1 - x0) / 2, 0.32)) { shakeT = Math.max(shakeT, 0.2); SFX.zap(); die("burn"); }
        }
        // Düşen Raf: within 1.5 tiles a 0.3 s jar rattle, then it topples toward her over its bottom corner (squash); the wreck stays, harmless
        for (const q of shelves) {
          if (q.st === "wait") {
            if (play && Math.abs(p.x - q.x) < 1.5 && Math.abs(p.y - HH - q.y) < 1.5) { q.st = "tell"; q.t = 0; }
          } else if (q.st === "tell") {
            q.t += dt; q.g.rotation.z = Math.sin(lt * 70) * 0.025; q.rt -= dt;
            if (q.rt <= 0 && onScreen(q.x)) { q.rt = 0.05; tone("square", 900 + Math.random() * 500, 700, 0.03, 0.04); noise(0.04, "bandpass", 2500, 1500, 0.08); }
            if (q.t >= 0.3) { q.st = "fall"; q.dir = p.x < q.x ? -1 : 1; q.w = 1; if (onScreen(q.x)) SFX.creak(); }
          } else if (q.st === "fall") {
            q.w += 22 * dt; q.a = Math.min(Math.PI / 2, q.a + q.w * dt);
            const sa = Math.sin(q.a), ca = Math.cos(q.a), bx = q.x + q.dir * 0.45 * (1 - ca), by = q.y + 0.45 * sa;
            q.g.rotation.z = -q.dir * q.a; q.g.position.set(bx, by, 0.3);
            if (play && q.a > 0.3) for (const s of [0.7, 1.2, 1.7, 2.1]) {
              const hx = bx + q.dir * sa * s, hy = by + ca * s;
              const qx = Math.max(p.x - HW, Math.min(p.x + HW, hx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, hy));
              if (Math.hypot(qx - hx, qy - hy) < 0.4) { SFX.bang(); shakeT = Math.max(shakeT, 0.3); die("squash"); break; }
            }
            if (q.a >= Math.PI / 2) {
              q.st = "down";
              if (onScreen(q.x)) {
                SFX.crash(); shakeT = Math.max(shakeT, 0.2);
                for (let k = 0; k < 9; k++) { const m = box(0.12, 0.16, JARS[k % 3]); m.position.set(q.x + q.dir * rnd(0.6, 2.4), q.y + 0.5, 0); addBit(m, { vx: rnd(-2, 2), vy: rnd(1.5, 4), spin: rnd(-10, 10), life: 0.7, z: 2.5 }); }
              }
              if (play && overlap(p.x, p.y, HW, HH, q.x + q.dir * 1.55, q.y + 0.45, 1.1, 0.45)) { SFX.bang(); die("squash"); }
            }
          }
        }
        // Fare Kapanı Dev: touching the board snaps the bar over (squash); jump over it
        for (const q of mtraps) {
          if (!q.shut && play && overlap(p.x, p.y, HW, HH, q.x, q.y + 0.12, 0.55, 0.12)) { q.shut = true; p.x = q.x; SFX.click(); SFX.bang(); shakeT = Math.max(shakeT, 0.25); die("squash"); }
          if (q.shut) q.bar.rotation.z += (-Math.PI - q.bar.rotation.z) * Math.min(1, dt * 30);
        }
        // Sallanan Ampul: bulb on a 1.5 s pendulum, lowest at head height, flickering and sparking; touch = burn
        for (const q of swingBulbs) {
          const ph = ((lt + q.ph) / 1.5) * Math.PI * 2;
          const a = 1.05 * Math.sin(ph); q.mesh.rotation.z = a;
          const side = Math.sign(a);
          if (side && side !== q.side) { if (q.side && onScreen(q.x)) SFX.whoosh(0.2); q.side = side; }
          const bx = q.x + q.L * Math.sin(a), by = q.py - q.L * Math.cos(a);
          q.gm.opacity = Math.max(0.12, q.gm.opacity - dt * 2);
          q.st -= dt;
          if (q.st <= 0) {
            q.st = rnd(0.15, 0.5); q.gm.opacity = 0.7; q.lm.color.setHex(Math.random() < 0.3 ? 0x6a5a30 : 0xfff0b0);
            if (onScreen(q.x)) {
              for (let k = 0; k < 2; k++) { const m = circle(rnd(0.02, 0.04), MAT.spark); m.position.set(bx, by + 0.15, 0); addBit(m, { vx: rnd(-2.5, 2.5), vy: rnd(0.5, 2.5), life: 0.35, z: 2.5 }); }
              if (Math.abs(p.x - q.x) < 6) noise(0.05, "highpass", 5000, 3000, 0.05);
            }
          }
          if (!play) continue;
          const qx = Math.max(p.x - HW, Math.min(p.x + HW, bx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, by));
          if (Math.hypot(qx - bx, qy - by) < 0.17) { shakeT = Math.max(shakeT, 0.2); SFX.zap(); die("burn"); }
        }
        // Örümcek: directly below it, a 0.25 s hiss, then it drops to head height, waits, and climbs back up; touch = bite
        for (const q of spiders) {
          let wig = 3;
          if (q.st === "wait") {
            q.t += dt; q.sy = q.top + Math.sin(lt * 2 + q.x) * 0.05;
            if (q.t >= 0 && play && Math.abs(p.x - q.x) < 0.4 && p.y < q.top) {
              q.st = "tell"; q.t = 0;
              if (onScreen(q.x)) { noise(0.25, "highpass", 6500, 3500, 0.16); tone("sawtooth", 2800, 1900, 0.25, 0.025); }
            }
          } else if (q.st === "tell") {
            q.t += dt; wig = 40; q.sy = q.top + (Math.random() - 0.5) * 0.04;
            if (q.t >= 0.25) { q.st = "drop"; q.vy = 0; }
          } else if (q.st === "drop") {
            wig = 0; q.vy -= 45 * dt; q.sy += q.vy * dt;
            const low = q.y + 0.5;
            if (q.sy <= low) { q.sy = low; q.st = "hold"; q.t = 0; if (onScreen(q.x)) SFX.chatter(); }
          } else if (q.st === "hold") {
            q.t += dt; wig = 20; q.sy = q.y + 0.5 + Math.sin(q.t * 18) * 0.04;
            if (q.t >= 0.6) q.st = "climb";
          } else if (q.st === "climb") {
            wig = 12; q.sy += 2.2 * dt;
            if (q.sy >= q.top) { q.sy = q.top; q.st = "wait"; q.t = -0.8; }
          }
          q.g.position.y = q.sy;
          for (const l of q.legs) l.leg.rotation.z = l.base + Math.sin(lt * wig + l.i * 1.3) * 0.18 * l.side;
          const len = q.anchor - q.sy; q.thread.scale.y = len; q.thread.position.y = q.sy + len / 2;
          if (!play) continue;
          const qx = Math.max(p.x - HW, Math.min(p.x + HW, q.x)), qy = Math.max(p.y - HH, Math.min(p.y + HH, q.sy - 0.08));
          if (Math.hypot(qx - q.x, qy - q.sy + 0.08) < 0.24) { SFX.chatter(); SFX.click(); shakeT = Math.max(shakeT, 0.25); die("spike"); }
        }
        // Çamaşır Makinesi: 2.2 s cycle; 0.3 s rumble and shake, then a heavy wet sock flies horizontally at her
        for (const q of washers) {
          const pt = q.t % 2.2; q.t += dt;
          const ph = q.t % 2.2, near = onScreen(q.x), tell = ph >= 1.9;
          if (!tell) q.dir = p.x < q.x ? -1 : 1;
          q.drum.rotation.z -= dt * (tell ? 26 : 4);
          if (tell) {
            q.g.position.y = q.y + Math.random() * 0.04; q.g.rotation.z = (Math.random() - 0.5) * 0.06; q.rt -= dt;
            if (q.rt <= 0 && near) { q.rt = 0.08; noise(0.1, "lowpass", 320, 110, 0.22); tone("square", 70, 55, 0.08, 0.05); shakeT = Math.max(shakeT, 0.04); }
          } else { q.g.position.y = q.y; q.g.rotation.z = 0; }
          if (ph < pt) { // spit
            const m = new THREE.Group(); m.add(box(0.4, 0.16, BD.sock, 0, 0, 0)); m.add(box(0.16, 0.26, BD.sock, -0.14, -0.06, 0.005));
            m.add(box(0.06, 0.16, BD.sockL, 0.17, 0, 0.01)); m.add(box(0.12, 0.05, BD.sockL, -0.02, 0, 0.01));
            const sx = q.x + q.dir * 0.6; m.scale.x = q.dir; m.position.set(sx, q.y + 0.5, 1.0); level.add(m);
            socks.push({ x: sx, y: q.y + 0.5, vx: q.dir * 8, d: 0, mesh: m }); q.kick = 0.12;
            if (near) {
              noise(0.2, "lowpass", 1200, 200, 0.4); tone("sine", 160, 70, 0.15, 0.25);
              for (let k = 0; k < 6; k++) { const b = circle(rnd(0.03, 0.06), BD.drip); b.position.set(sx, q.y + 0.5, 0); addBit(b, { vx: q.dir * rnd(1, 3), vy: rnd(0.5, 2.5), life: 0.6, z: 2.5 }); }
            }
          }
          q.kick = Math.max(0, q.kick - dt); q.g.position.x = q.x - q.dir * q.kick + (tell ? (Math.random() - 0.5) * 0.06 : 0);
        }
        for (let i = socks.length - 1; i >= 0; i--) {
          const s = socks[i];
          s.x += s.vx * dt; s.d += Math.abs(s.vx) * dt; s.mesh.position.x = s.x; s.mesh.rotation.z = Math.sin(s.d * 3) * 0.15;
          if (Math.random() < dt * 12 && onScreen(s.x)) { const b = circle(0.03, BD.drip); b.position.set(s.x, s.y - 0.1, 0); addBit(b, { vx: rnd(-0.3, 0.3), vy: 0, life: 0.5, z: 2.5 }); }
          if (s.d > 12 || solid(Math.floor(s.x), Math.floor(s.y))) { level.remove(s.mesh); socks.splice(i, 1); continue; }
          if (play && overlap(p.x, p.y, HW, HH, s.x, s.y, 0.22, 0.14)) { shakeT = Math.max(shakeT, 0.3); SFX.bang(); SFX.splash(); die("arrow", Math.sign(s.vx)); level.remove(s.mesh); socks.splice(i, 1); }
        }
        // Gıcırdayan Basamak: creaks the moment she lands, then (0.3 s later, via the fake-ground timer) snaps in half and falls
        for (const q of stairSteps) {
          if (q.f.timer >= 0 && !q.cr) { q.cr = true; if (onScreen(q.x)) SFX.creak(); }
          if (q.f.fallen) {
            if (!q.sn) {
              q.sn = true;
              if (onScreen(q.x)) {
                noise(0.12, "highpass", 3000, 1200, 0.35); tone("square", 500, 120, 0.08, 0.1);
                for (let k = 0; k < 5; k++) { const b = box(0.12, 0.04, MAT.woodL); b.position.set(q.x + rnd(-0.2, 0.2), q.f.mesh.position.y + 0.4, 0); addBit(b, { vx: rnd(-2, 2), vy: rnd(1, 3), spin: rnd(-10, 10), life: 0.7, z: 2.5 }); }
              }
            }
            q.L.rotation.z += dt * 2.5; q.R.rotation.z -= dt * 2.5; q.L.position.x -= dt * 0.6; q.R.position.x += dt * 0.6;
          }
        }
        // Fırlayan Tahta: stepping on one end, a 0.15 s creak, then the other end flips up and over into her (nail side first)
        for (const q of flipBoards) {
          if (q.st === "wait") {
            q.cool -= dt;
            const dx = p.x - q.x;
            if (q.cool <= 0 && play && p.onGround && Math.abs(dx) < 1.0 && Math.abs(p.y - HH - q.y) < 0.15) {
              q.st = "tell"; q.t = 0; q.s = Math.sign(dx) || -p.face || 1;
              if (onScreen(q.x)) { tone("sawtooth", 260, 170, 0.15, 0.06); noise(0.12, "bandpass", 1600, 800, 0.08); }
            }
          } else if (q.st === "tell") {
            q.t += dt; q.m = 0.1;
            if (q.t >= 0.15) { q.st = "flip"; if (onScreen(q.x)) SFX.whoosh(0.5); }
          } else if (q.st === "flip") {
            q.m = Math.min(2.75, q.m + 16 * dt);
            if (q.m >= 2.75) { q.st = "up"; q.t = 0; if (onScreen(q.x)) { noise(0.2, "lowpass", 900, 150, 0.35); shakeT = Math.max(shakeT, 0.12); } }
          } else if (q.st === "up") {
            q.t += dt; if (q.t >= 0.7) q.st = "back";
          } else if (q.st === "back") {
            q.m = Math.max(0, q.m - 6 * dt);
            if (q.m <= 0) { q.st = "wait"; q.cool = 0.8; if (onScreen(q.x)) SFX.tap(); }
          }
          const rot = -q.s * q.m; q.g.rotation.z = rot;
          if (!play || q.st !== "flip") continue;
          const cr = Math.cos(rot), sr = Math.sin(rot);
          for (const lx of [-q.s * 0.5, -q.s * 0.75, -q.s * 1.0]) {
            const ly = -0.1, hx = q.x + lx * cr - ly * sr, hy = q.py + lx * sr + ly * cr;
            const qx = Math.max(p.x - HW, Math.min(p.x + HW, hx)), qy = Math.max(p.y - HH, Math.min(p.y + HH, hy));
            if (Math.hypot(qx - hx, qy - hy) < 0.12) { SFX.needle(); SFX.click(); shakeT = Math.max(shakeT, 0.25); die("spike"); break; }
          }
        }
        // Patlayan Turşu Kavanozu: within 1.5 tiles it bubbles 0.7 s, then bursts; glass bits spray 1.5 tiles each side (spike)
        for (const q of pjars) {
          if (q.st === "wait") {
            if (play && Math.abs(p.x - q.x) < 1.5 && Math.abs(p.y - HH - q.y) < 1.5) { q.st = "tell"; q.t = 0; }
          } else if (q.st === "tell") {
            q.t += dt; q.rt -= dt;
            q.g.position.x = q.x + (Math.random() - 0.5) * 0.04 * (1 + q.t * 4); q.g.scale.y = 1 + 0.06 * q.t;
            q.lid.position.y = 0.86 + q.t * 0.12;
            if (q.rt <= 0 && onScreen(q.x)) {
              q.rt = 0.06; tone("sine", 300 + Math.random() * 400, 900, 0.05, 0.05);
              const m = circle(rnd(0.03, 0.06), BD.puff); m.position.set(q.x + rnd(-0.2, 0.2), q.y + 0.85, 0); addBit(m, { vx: rnd(-0.3, 0.3), vy: rnd(0.8, 1.6), g: 0, life: 0.4, z: 2.5 });
            }
            if (q.t >= 0.7) {
              q.st = "burst"; q.t = 0; q.g.visible = false;
              if (onScreen(q.x)) {
                SFX.crash(); noise(0.3, "highpass", 6000, 3000, 0.3); shakeT = Math.max(shakeT, 0.15);
                for (let k = 0; k < 14; k++) { const m = box(rnd(0.06, 0.12), rnd(0.04, 0.08), HP.sheet); m.position.set(q.x, q.y + 0.45, 0); addBit(m, { vx: rnd(-6, 6), vy: rnd(0.5, 4), spin: rnd(-14, 14), life: 0.5, z: 2.5 }); }
                for (let k = 0; k < 6; k++) { const m = box(0.1, 0.22, JARS[0]); m.position.set(q.x, q.y + 0.4, 0); addBit(m, { vx: rnd(-3, 3), vy: rnd(2, 4), spin: rnd(-10, 10), life: 0.7, z: 2.5 }); }
              }
            }
          } else if (q.st === "burst") {
            q.t += dt;
            if (play && q.t < 0.15 && overlap(p.x, p.y, HW, HH, q.x, q.y + 0.6, 1.25, 0.6)) { SFX.needle(); shakeT = Math.max(shakeT, 0.25); die("spike"); }
            if (q.t >= 0.15) q.st = "gone";
          }
        }
      }

      /* ===== Update: surprise traps (Surat, Ezici, Kuş, Kapan, Sahte Bayrak) ===== */
      function updateSurprises(dt) {
        for (const s of surprises) {
          if (s.used || state !== "play") continue;
          const near = Math.abs(p.x - s.x) < 0.5;
          if (s.t === "j" && near) { // troll face: scare only
            s.used = true; scareStart = performance.now(); scareEnd = scareStart + 500;
            SFX.sting(); shakeT = Math.max(shakeT, 0.8); buzz(220);
          } else if (s.t === "e" && p.onGround && Math.abs(p.x - s.x) < 0.38 && Math.abs(p.y - HH - s.cy) < 0.2) { // stepped on the red button
            s.used = true; s.pressT = 0; SFX.click(); buzz(30);
            s.mesh.userData.dome.position.y = 0.02; s.mesh.userData.glowMat.opacity = 0.08;
          } else if (s.t === "b" && near) { // bird from off-screen ahead, swooping to head height
            s.used = true;
            const dir = p.face, m = birdMesh(), x = camera.position.x + dir * (viewW / 2 + 1.5), ty = p.y + 0.3;
            m.scale.x = -dir; m.position.set(x, ty + 2.5, 2.4); level.add(m);
            birds.push({ x, y: ty + 2.5, ty, vx: -dir * 12, dist: 0, mesh: m }); SFX.screech();
          } else if (s.t === "k" && p.onGround && Math.abs(p.x - s.x) < 0.45) { // trap door right under the feet
            s.used = true; SFX.click();
            for (const k in doors) {
              const d = doors[k]; if (+k.split(",")[0] !== s.c) continue;
              d.open = true; d.mesh.visible = false;
              if (d.top) [-1, 1].forEach((side) => {
                const f = new THREE.Group(), y = s.cy;
                f.add(box(0.5, 0.18, MAT.grass, -side * 0.25, -0.09, 0)); f.add(box(0.5, 0.1, MAT.dirt, -side * 0.25, -0.22, 0));
                f.position.set(s.x + side * 0.5, y, 0.05); level.add(f); flaps.push({ mesh: f, side, t: 0 });
              });
            }
            p.x = s.x; p.vx = 0; p.mvx = 0; p.onGround = false; p.coyote = 0; p.buf = 0;
          } else if (s.t === "f" && overlap(p.x, p.y, HW, HH, s.x + 0.1, s.cy + 0.85, 0.2, 0.85)) { // fake flag: spikes!
            s.used = true; s.sprungT = 0; SFX.laugh(); die("spike");
          }
        }
        // Ezici buttons: idle glow pulses; 0.35 s after a press the chained block drops onto the button
        const now = performance.now() / 1000;
        for (const s of surprises) if (s.t === "e") {
          if (s.pressT < 0) { s.mesh.userData.glowMat.opacity = 0.22 + 0.14 * Math.sin(now * 4 + s.x); continue; }
          if (s.pressT >= 0.35) continue;
          s.pressT += dt;
          if (s.pressT >= 0.35) {
            const m = crusherMesh(), x = s.x, y = camera.position.y + viewH / 2 + 1;
            m.position.set(x, y, 1.5); level.add(m);
            crushers.push({ x, y, y0: y, vy: -28, hw: 0.8, hh: 0.8, st: "fall", t: 0, mesh: m });
          }
        }
        // fake flag animation: the flag sinks, spikes shoot up
        for (const s of surprises) if (s.t === "f" && s.sprungT !== undefined) {
          s.sprungT += dt;
          s.spk.scale.y = Math.min(1, s.sprungT / 0.07) || 0.001;
          s.mesh.position.y = s.cy - Math.min(3, s.sprungT * 8);
        }
        // trap door flaps swing down
        for (const f of flaps) { f.t = Math.min(1, f.t + dt / 0.12); f.mesh.rotation.z = f.side * (Math.PI / 2) * f.t; }
        // crushers: fall very fast, bang, rest, then winch back up
        for (let i = crushers.length - 1; i >= 0; i--) {
          const c = crushers[i];
          if (c.st === "fall") {
            c.vy -= 90 * dt; c.y += c.vy * dt;
            const cy = Math.floor(c.y - c.hh);
            for (let x = Math.floor(c.x - c.hw + 0.01); x <= Math.floor(c.x + c.hw - 0.01); x++) if (solid(x, cy)) {
              c.y = cy + 1 + c.hh; c.st = "rest"; c.t = 1.1; SFX.bang(); shakeT = Math.max(shakeT, 0.45); buzz(90);
              dust(c.x - c.hw, cy + 1, 5, -1); dust(c.x + c.hw, cy + 1, 5, 1); break;
            }
            if (state === "play" && overlap(p.x, p.y, HW, HH, c.x, c.y, c.hw * 0.95, c.hh)) die("squash");
            if (c.y < -10) c.st = "gone";
          } else if (c.st === "rest") { c.t -= dt; if (c.t <= 0) c.st = "up"; }
          else if (c.st === "up") { c.y += 3 * dt; if (c.y > c.y0) c.st = "gone"; }
          if (c.st === "gone") { level.remove(c.mesh); crushers.splice(i, 1); continue; }
          // resting / rising block is a wall
          if (c.st !== "fall" && state === "play" && overlap(p.x, p.y, HW, HH, c.x, c.y, c.hw, c.hh) && p.y - HH < c.y + c.hh - 0.1) {
            p.x = p.x < c.x ? c.x - c.hw - HW - 0.001 : c.x + c.hw + HW + 0.001; p.mvx = 0;
          }
          c.mesh.position.y = c.y;
        }
        // birds: swoop down to head height and fly straight through
        for (let i = birds.length - 1; i >= 0; i--) {
          const b = birds[i];
          b.x += b.vx * dt; b.dist += Math.abs(b.vx * dt); b.y += (b.ty - b.y) * Math.min(1, dt * 5);
          b.mesh.position.set(b.x, b.y, 2.4); b.mesh.rotation.z = (b.ty - b.y) * 0.25 * Math.sign(b.vx);
          b.mesh.userData.wings.forEach((w, k) => (w.rotation.z = Math.sin(lt * 38 + k) * 0.9));
          if (state === "play" && overlap(p.x, p.y, HW, HH, b.x, b.y, 0.35, 0.15)) die("arrow", Math.sign(b.vx));
          if (b.dist > 40) { level.remove(b.mesh); birds.splice(i, 1); }
        }
      }

      /* ===== Update: dead ragdoll ===== */
      function updateDead(dt) {
        dieT += dt;
        const k = p.kind;
        if (k === "water") { p.x += p.vx * dt; p.y -= 0.5 * dt; player.rotation.z = Math.sin(dieT * 6) * 0.15; } // slow sink
        else if (k === "arrow") { p.vy -= GRAV * dt; p.x += p.vx * dt; p.y += p.vy * dt; player.rotation.z += p.spin * dt; }
        else if (k === "fall") { p.vy = Math.max(p.vy - GRAV * dt, -20); p.x += p.vx * dt; p.y += p.vy * dt; }
        else if (k === "burn") {
          if (p.by > p.fl) { p.bvy -= GRAV * dt; p.by = Math.max(p.fl, p.by + p.bvy * dt); } // mid-jump: drop to the floor first
          const u = Math.max(0, dieT - 0.45), a = Math.min(1.5, 3.2 * u * u); // stiff shiver, then tips over backward
          const rz = p.face * (a + (a < 1.5 ? Math.sin(dieT * 55) * 0.04 * (1 - a / 1.5) : 0));
          player.rotation.z = rz;
          p.x = p.bx - Math.sin(rz) * HH; p.y = p.by + Math.cos(rz) * HH + Math.abs(Math.sin(rz)) * 0.12;
          if (a >= 1.5 && !p.thud) { p.thud = true; shakeT = Math.max(shakeT, 0.15); noise(0.15, "lowpass", 600, 120, 0.3); }
          p.smT -= dt;
          if (p.smT <= 0) {
            p.smT = 0.06;
            const puff = circle(rnd(0.07, 0.13), M(0x2a2826, { transparent: true, opacity: 0.75 }));
            puff.position.set(p.x + rnd(-0.15, 0.15), p.y + rnd(0, 0.25), 0);
            addBit(puff, { vx: rnd(-0.4, 0.4), vy: rnd(0.8, 1.6), g: 0, life: 0.9, grow: 1.6, fade: true, z: 2.65 });
            if (Math.random() < 0.6) { const s = circle(0.035, MAT.spark); s.position.set(p.x + rnd(-0.2, 0.2), p.y, 0); addBit(s, { vx: rnd(-3, 3), vy: rnd(2, 5), life: 0.4, z: 2.7 }); }
          }
        }
        deadTimer -= dt;
        if (deadTimer <= 0) restart();
      }

      /* ===== Render sync: player pose, camera, back walls ===== */
      function sync(dt) {
        // pivot rotations around the body's centre, not the feet
        const rz = player.rotation.z;
        player.position.x = p.x + Math.sin(rz) * HH; player.position.y = p.y - Math.cos(rz) * HH;
        const walking = state === "play" && p.onGround && p.vx;
        if (walking) walkT += dt * 8; else walkT *= 0.8; // slow, deliberate cadence (visual only)
        ageT += dt; dipT = Math.max(0, dipT - dt * 3.5); wobT = Math.max(0, wobT - dt);
        const ph = Math.floor(walkT / Math.PI); // a soft tick each time a foot comes down
        if (ph !== stepPh) { stepPh = ph; if (walking) SFX.step(); }
        // tiny shuffling steps on bent knees, a deep 45-degree hunch, a shaky body and a trembling head
        const sw = Math.sin(walkT) * 0.11;
        const shake = Math.sin(ageT * 19) * 0.012 + Math.sin(ageT * 31) * 0.007;
        const dip = dipT > 0 ? Math.sin(dipT * Math.PI) : 0; // body sinks onto the cane each tap
        const wob = Math.sin(wobT * 26) * wobT * 0.2; // brief wobble after landing
        legL.rotation.z = KNEE + sw; legR.rotation.z = KNEE - sw;
        // far arm: hidden behind her body on normal levels; in the dark it reaches forward from behind the torso with the torch
        armB.visible = torch.visible; armB.position.x = 0.15; armB.position.z = 0.03; // z below the torso (0.07), so the body covers the shoulder
        armB.rotation.z = 1.1 + sw * 0.15;
        torso.rotation.z = LEAN + Math.sin(walkT) * 0.03 + shake - dip * 0.06 + wob;
        torso.position.y = 0.41 + Math.abs(Math.sin(walkT)) * 0.005 - dip * 0.035;
        head.rotation.z = HEAD_R + Math.sin(walkT * 2) * 0.025 + Math.sin(ageT * 24) * 0.035 + Math.sin(ageT * 39) * 0.015 - wob * 0.8;
        // cane bears her weight: once per stride it lifts, swings forward, and taps down; while planted the body passes it
        const s = (walkT / (Math.PI * 2) + 0.75) % 1;
        let cw, ch = 0;
        if (s >= 0.5) cw = 0.2 - 0.28 * ((s - 0.5) / 0.5);
        else { const u = s / 0.5; cw = -0.08 + 0.28 * (u * u * (3 - 2 * u)); ch = Math.sin(Math.PI * u) * 0.04; }
        const shY = SHOULDER_Y - dip * 0.03; armF.position.y = shY; armB.position.y = shY;
        const ca = Math.acos(Math.max(-1, Math.min(1, (shY - ch - CANE_L * Math.cos(cw)) / ARM_L)));
        const nowPlanted = s >= 0.5;
        // front shoulder follows the cane: eases forward while it swings, then pushes back while it is planted
        const push = walking ? (nowPlanted ? 0.012 - 0.024 * ((s - 0.5) / 0.5) : -0.012 + 0.024 * Math.sin(Math.PI * 0.5 * (s / 0.5))) : 0;
        armF.position.x = 0.2 + push;
        const idleT = walking ? 0 : Math.sin(ageT * 23) * 0.008 + Math.sin(ageT * 37) * 0.005; // tiny tremble at rest
        armF.rotation.z = ca + shake * 0.5 + idleT; cane.rotation.z = cw - ca - shake * 0.5 - idleT * 0.6;
        if (nowPlanted && !planted && walking) { SFX.tap(); dipT = 1; }
        planted = nowPlanted;
        // free hand (dark levels only): holds the flashlight forward and a little down, in front of her chest
        if (torch.visible) armB.rotation.z = 1.1 + shake;
        // bun on a little spring: lags behind sudden vertical changes (jump, landing) and wobbles back
        if (state === "play") {
          bunV += (-bunO * 420 - bunV * 9) * dt - (p.vy - lastVy) * 0.012 + (p.onGround && p.vx ? Math.cos(walkT * 2) * 0.6 * dt : 0);
          bunO = Math.max(-0.05, Math.min(0.05, bunO + bunV * dt));
        }
        lastVy = p.vy;
        bun.position.y = 0.092 + bunO; bun.rotation.z = bunO * 4;
        let sx = 1, sy = 1;
        if (state === "play") { // squash & stretch spring: stretch on jump, squash on landing
          p.ssV += (-p.ss * 380 - p.ssV * 16) * dt; p.ss += p.ssV * dt;
          sy = 1 + p.ss; sx = 1 - p.ss * 0.6;
        }
        if (state === "play" && p.rope) { // both hands up on the rope, legs dangle with the swing
          const d = p.rope.w * 0.12 * p.face;
          armF.rotation.z = Math.PI; armB.rotation.z = Math.PI - 0.2; legL.rotation.z = 0.15 - d; legR.rotation.z = -0.1 - d;
          cane.rotation.z = -Math.PI + 0.25; // cane hangs from the rope hand
        } else if (state === "play" && !p.onGround) { // tuck: knees up, deeper hunch, cane swung up
          const lift = Math.max(-0.15, Math.min(0.15, p.vy * 0.02)); // cane rises on the way up, settles on the way down
          legL.rotation.z = 0.9; legR.rotation.z = 0.6; armF.rotation.z = 2.0 + lift; armF.position.x = 0.2; cane.rotation.z = -0.6 - lift * 0.5;
          torso.rotation.z = LEAN - 0.15; head.rotation.z = HEAD_R + 0.1;
        }
        if (state === "dead") {
          const k = p.kind;
          if (k === "fall") { armF.rotation.z = 2.5 + Math.sin(dieT * 30) * 1.0; armB.rotation.z = 2.2 + Math.sin(dieT * 30 + 1.6) * 1.0; legL.rotation.z = Math.sin(dieT * 24) * 0.7; legR.rotation.z = -legL.rotation.z; }
          else if (k === "arrow") { armF.rotation.z = 1.7; armB.rotation.z = -1.4; legL.rotation.z = 0.6; legR.rotation.z = -0.5; }
          else if (k === "water") { armF.rotation.z = 2.8 + Math.sin(dieT * 14) * 0.4; armB.rotation.z = 2.6 + Math.sin(dieT * 14 + 2) * 0.4; }
          else if (k === "burn") { armF.rotation.z = 0.5; armB.rotation.z = -0.35; legL.rotation.z = 0.05; legR.rotation.z = -0.05; torso.rotation.z = LEAN * 0.5; }
          else if (k === "spike" || k === "squash") { const q = Math.min(1, dieT / 0.08); sy = 1 - 0.72 * q; sx = 1 + 0.55 * q; armF.rotation.z = 1.57; armB.rotation.z = -1.57; legL.rotation.z = 1.2; legR.rotation.z = -1.2; }
        }
        if (torch.visible) armB.rotation.z = Math.max(0.5, armB.rotation.z); // the far arm always reaches forward, never onto her back
        player.scale.set(p.face * sx, sy, 1);
        torch.rotation.z = -armB.rotation.z - 0.1; // beam stays level with her gaze, slightly down
        if (dark.visible) { // the cone swings (down through her feet) to her facing side
          const bt = p.face < 0 ? -Math.PI + 0.1 : -0.1;
          beamA += (bt - beamA) * Math.min(1, dt * 9);
          dark.position.set(p.x, p.y, 6); hole.rotation.z = beamA;
        }
        // look-ahead: lead the camera in the direction of travel, eased
        const lookT = state === "play" ? (p.vx ? Math.sign(p.vx) * Math.min(1, Math.abs(p.vx) / SPEED) : p.face * 0.3) * 2.2 : look;
        look += (lookT - look) * Math.min(1, dt * 2.5);
        const half = viewW / 2, target = W > viewW ? Math.max(half, Math.min(W - half, p.x + look)) : W / 2;
        camX += (target - camX) * Math.min(1, dt * 8);
        shakeT = Math.max(0, shakeT - dt);
        const sh = shakeT * 0.5;
        camera.position.x = camX + rnd(-sh, sh);
        camera.position.y = viewH / 2 - 1.2 + rnd(-sh, sh);
        // Surat: the troll face pops up over everything (even the darkness) for 0.5 s
        const nowMs = performance.now();
        scareFace.visible = nowMs < scareEnd;
        if (scareFace.visible) {
          const k = Math.min(1, (nowMs - scareStart) / 70), s = (0.5 + 0.62 * k) * (1 + Math.sin(nowMs / 18) * 0.02);
          scareFace.scale.set(viewW * s, viewH * s, 1);
          scareFace.position.set(camera.position.x + rnd(-0.15, 0.15), camera.position.y + rnd(-0.15, 0.15), 9);
          scareFace.rotation.z = rnd(-0.03, 0.03);
        }
        // back walls follow the camera; their textures scroll slower for parallax
        const bw = viewW + 2, bh = viewH + 2, lv = 0.45 + 0.55 * lightLevel;
        BACK_LAYERS.forEach(([m, k, z]) => {
          m.scale.set(bw, bh, 1); m.position.set(camera.position.x, camera.position.y, z);
          m.material.map.repeat.set(bw / bh, 1); m.material.map.offset.x = (camera.position.x * k) / bh;
          m.material.color.setScalar(lv);
        });
      }

      /* ===== Main loop ===== */
      buildLevel(0); // markBase() runs here: everything made before this line is shared and never disposed
      camX = camera.position.x = Math.max(viewW / 2, p.x);
      let last = performance.now();
      function loop(now) {
        let dt = Math.min(1 / 30, (now - last) / 1000); last = now;
        if (window.orientPaused) { // portrait phone: freeze until rotated, drop held inputs
          touch.left = touch.right = touch.jump = false; jumpPressed = false; if (joy.id !== null) joyReset();
          if (sawGain) sawGain.gain.value = 0;
          musicTick(); requestAnimationFrame(loop); return;
        }
        if (hitT > 0) { hitT -= dt; jumpPressed = false; renderer.render(scene, camera); requestAnimationFrame(loop); return; } // ~80 ms freeze on death
        if (slowT > 0) { slowT -= dt; dt *= 0.3; } // ~0.6 s of slow motion after a death
        if (introGrace) { introGrace = false; jumpPressed = false; } // the tap that skipped Kukla is not a jump
        updateBulbs(dt); heartbeat(dt); musicTick();
        if (state === "play") { updatePlayer(dt); updateRopes(dt); updateTraps(dt); }
        else if (state === "dead") { updateRopes(dt); updateTraps(dt); updateDead(dt); }
        updateBits(dt);
        jumpPressed = false;
        sync(dt);
        renderer.render(scene, camera);
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
      window.startGame = startGame; window.continueGame = continueGame; window.gameReady = true; // only now can Başla start the game
      })();
    