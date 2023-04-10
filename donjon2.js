class donjon2 extends Phaser.Scene {

    constructor() {
        super("donjon2");
    }
    init(data) {
        console.log('init', data);
        this.origine = data.origin
        this.powerup2 = data.powerup2;
        this.powerup3 = data.powerup3;
        this.vieActuelle = data.vieA;
        this.vieMax = data.vieM;
        this.counterPerle = data.counterPerle
        this.boss1vaincu = data.boss1
        this.boss2vaincu = data.boss2
        this.boostViePrise = data.tabBoostVie

    }


    preload() {

        this.load.spritesheet('perso', 'assets/sprites/Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 62 });



        this.load.image("tileDJ2", "assets/tileset.png");
        this.load.tilemapTiledJSON("carteDJ2", "assets/maps/map_donjon2.json");

        if (this.powerup3) {
            this.load.spritesheet('UI1', 'assets/UI/UI_3.png',
                { frameWidth: 576, frameHeight: 320 });
        }
        else if (this.powerup2) {
            this.load.spritesheet('UI1', 'assets/UI/UI_2.png',
                { frameWidth: 576, frameHeight: 320 });
        }
        else {
            this.load.spritesheet('UI1', 'assets/UI/UI_1.png',
                { frameWidth: 576, frameHeight: 320 });
        }
        this.load.spritesheet('UI3', 'assets/UI/UI_3.png',
        { frameWidth: 576, frameHeight: 320 });

        //sprites courants
        this.load.spritesheet('courrant', 'assets/sprites/courrant.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('courrant2', 'assets/sprites/courrant2.png',
            { frameWidth: 64 * 2, frameHeight: 64 });
        this.load.spritesheet('courrant3', 'assets/sprites/courrant4.png',
            { frameWidth: 64 * 2 * 2, frameHeight: 64 });
        this.load.spritesheet('courrant2_1', 'assets/sprites/courrant2_1.png',
            { frameWidth: 64, frameHeight: 64 * 2 });
        this.load.spritesheet('courrant3_1', 'assets/sprites/courrant4_1.png',
            { frameWidth: 64, frameHeight: 64 * 2 * 2 });
        this.load.spritesheet('porte', 'assets/sprites/porte.png',
            { frameWidth: 256, frameHeight: 192});
            this.load.spritesheet('levier', 'assets/sprites/levier.png',
            { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('crane', 'assets/sprites/pieuvre_crane.png',
            { frameWidth: 320, frameHeight: 384 });

        this.load.image("gun", "assets/anims/pistolet_crevette.png");
        this.load.image("bulles", "assets/anims/bulles.png");
        this.load.image("requin", "assets/sprites/Sprite_enemmi_01.png");
        this.load.image("soin", "assets/sprites/Sprite_coeur_soin.png");
        this.load.image("perle", "assets/sprites/Sprite_perle.png");
        this.load.image("pinceARamass", "assets/sprites/icone_crabe.png");
        this.load.image("tentacule", "assets/sprites/pieuvre_tenta.png");
        this.load.image("tentacule2", "assets/sprites/pieuvre_tenta2.png");



    }


    create() {

        const carteDuNiveauDonjon2 = this.add.tilemap("carteDJ2");

        const tilesetDJ2 = carteDuNiveauDonjon2.addTilesetImage(
            "tileset",
            "tileDJ2"
        );



        //il s'appelle calque pic mais c'est surtout celui avec la lave
        const calque_sol_DJ2 = carteDuNiveauDonjon2.createLayer(
            "sol_donj2",
            tilesetDJ2
        );



        const calque_murs_donj2 = carteDuNiveauDonjon2.createLayer(
            "murs_donj2",
            tilesetDJ2
        );

        const calque_obstacles_DJ2 = carteDuNiveauDonjon2.createLayer(
            "obstacles_donj2",
            tilesetDJ2
        );




        calque_murs_donj2.setCollisionByProperty({ EstSolide: true });

        calque_obstacles_DJ2.setCollisionByProperty({ EstSolide: true });





        this.player = this.physics.add.sprite(880, 920, 'perso');




        this.player.setScale(1.2)
        this.player.setSize(45, 45)

        this.origine = "donjon2"


        this.physics.add.collider(this.player, calque_murs_donj2);
        this.physics.add.collider(this.player, calque_obstacles_DJ2);


        this.physics.world.setBounds(0, 0, 15000, 15000);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(-1000, -1000, 15000, 15000);

        this.cameras.main.centerOn(900, 640)


        this.cameras.main.setZoom(0.6)



        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastFacingDirection = "right"



        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //affichage UI
        this.ui = this.physics.add.sprite(-100, -80, 'UI1');
        // this.ui.setScale(0.8)
        this.ui.depth = 2;
        this.ui.setScrollFactor(0)

        //compteur monnaie
        this.comptPerle = this.add.text(-220, 0, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 });
        this.comptPerle.depth = 4
        this.comptPerle.setScrollFactor(0);
        //this.comptPerle.setScale(0.8)










        //armes

        this.epee = this.physics.add.sprite(0, 6400, 'epee');
        this.epee2 = this.physics.add.sprite(0, 6400, 'epee2');
        this.pince = this.physics.add.sprite(0, 6400, 'pince');
        this.pince2 = this.physics.add.sprite(0, 6400, 'pince2');
        this.gun = this.physics.add.sprite(0, 6400, 'gun');
        this.bulles1 = this.physics.add.sprite(0, 6400, 'bulles');
        this.bulles2 = this.physics.add.sprite(0, 6400, 'bulles');
        this.bulles3 = this.physics.add.sprite(0, 6400, 'bulles');
        this.bulles4 = this.physics.add.sprite(0, 6400, 'bulles');

        this.bulleUtil = 0;
        this.attk = true;
        this.degatsPris = false;
        this.courantActif = false





//ajout leviers
        this.levier1 = this.physics.add.sprite(5420, 2344, 'levier');
        this.levier1.levierActif=false
        this.levier1.immovable=true
        this.levier1.body.allowGravity = false;
        this.physics.add.overlap(this.bulles1, this.levier1, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles2, this.levier1, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles3, this.levier1, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles4, this.levier1, this.bougeLevier, null, this);

        this.levier2 = this.physics.add.sprite(5980, 7333, 'levier');
        this.levier2.levierActif=false
        this.levier2.immovable=true
        this.physics.add.overlap(this.bulles1, this.levier2, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles2, this.levier2, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles3, this.levier2, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles4, this.levier2, this.bougeLevier, null, this);
        this.levier3 = this.physics.add.sprite(8700, 2433, 'levier');
        this.levier3.levierActif=false
        this.levier3.immovable=true
        this.physics.add.overlap(this.bulles1, this.levier3, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles2, this.levier3, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles3, this.levier3, this.bougeLevier, null, this);
        this.physics.add.overlap(this.bulles4, this.levier3, this.bougeLevier, null, this);


        this.porte = this.physics.add.sprite(900, 2240-64-32, 'porte');
        this.porte.body.immovable=true
        this.porte.body.allowGravity = false;

        this.physics.add.collider(this.player, this.porte);


        //creation courants

        {
            //salle du fond
            this.courant1 = this.physics.add.sprite(7350, 9124, 'courrant3');
            this.courant1.flipX=true;
            this.courant2 = this.physics.add.sprite(7350+64*3-32, 8610, 'courrant');
            this.courant2.flipX=true;
            this.courant3 = this.physics.add.sprite(7350+64*3-32, 8610-64, 'courrant');
            this.courant3.flipX=true;
            this.courant4 = this.physics.add.sprite(7350+45, 8610-64-64-64, 'courrant3_1');
            this.courant4.flipY=true;
            this.courant5 = this.physics.add.sprite(7350-22, 8610-64*6, 'courrant3_1');
            this.courant5.flipY=true;
            this.courant6 = this.physics.add.sprite(7454+64, 7962, 'courrant3');
            this.courant7 = this.physics.add.sprite(7350-22, 7615, 'courrant2_1');
            this.courant7.flipY=true;
            this.courant8 = this.physics.add.sprite(7350-22+64, 7615, 'courrant2_1');
            this.courant8.flipY=true;            
            this.courant9 = this.physics.add.sprite(7350-22+128, 7615, 'courrant2_1');
            this.courant9.flipY=true;           
            this.courant10 = this.physics.add.sprite(7350-22+64*3, 7615, 'courrant2_1');
            this.courant10.flipY=true;           
            this.courant11 = this.physics.add.sprite(7350-22+128*2, 7615, 'courrant2_1');
            this.courant11.flipY=true;
            this.courant12 = this.physics.add.sprite(7350-22+128*2+64, 7615, 'courrant2_1');
            this.courant12.flipY=true;
            this.courant13 = this.physics.add.sprite(7350-22+128*3, 7615, 'courrant2_1');
            this.courant13.flipY=true;
            this.courant14 = this.physics.add.sprite(7350+45, 8610-64*7, 'courrant3_1');
            this.courant14.flipY=true;
            this.courant15 = this.physics.add.sprite(8230, 8610-64*8, 'courrant3_1');
            this.courant16 = this.physics.add.sprite(7454+64+128*2, 7962, 'courrant3');
            this.courant17 = this.physics.add.sprite(8230-64, 8610-64*8, 'courrant3_1');
            this.courant18 = this.physics.add.sprite(8230+64, 8610-64*8, 'courrant3_1');
            this.courant19 = this.physics.add.sprite(8230-128, 8610-64*8, 'courrant3_1');
            this.courant20 = this.physics.add.sprite(8230-128-64, 8610-64*8, 'courrant3_1');
            this.courant21 = this.physics.add.sprite(8230-128-128, 8610-64*8, 'courrant3_1');
            this.courant22 = this.physics.add.sprite(7350-128*6-70, 9124-64, 'courrant3');
            this.courant22.flipX=true;
            this.courant23 = this.physics.add.sprite(7350-128*6-70, 9124, 'courrant3');
            this.courant23.flipX=true;
            this.courant24 = this.physics.add.sprite(7350-128*6-70, 9124-130, 'courrant3');
            this.courant25 = this.physics.add.sprite(7350-128*3, 9124-128*3, 'courrant3_1');
            this.courant25.flipY=true;
            this.courant26 = this.physics.add.sprite(7350-128*3+64, 9124-128*3, 'courrant3_1');
            this.courant26.flipY=true;
            this.courant27 = this.physics.add.sprite(7350-128*3-64*3, 9124-128*3, 'courrant3_1');
            this.courant27.flipY=true;
            this.courant28 = this.physics.add.sprite(7350-128*3-128, 9124-128*3, 'courrant3_1');
            this.courant28.flipY=true;
            this.courant29 = this.physics.add.sprite(7350-128*3-64, 9124-128*3, 'courrant3_1');
            this.courant29.flipY=true;
            this.courant30 = this.physics.add.sprite(7350-128*3+128, 9124-128*3, 'courrant3_1');
            this.courant30.flipY=true;
            this.courant31 = this.physics.add.sprite(7350-128*3-64*4, 9124-128*3, 'courrant3_1');
            this.courant31.flipY=true;

            this.courant32 = this.physics.add.sprite(6760, 8322, 'courrant3');
            this.courant32.flipX=true
            this.courant33 = this.physics.add.sprite(6760, 8322-64, 'courrant3');
            this.courant33.flipX=true
            this.courant34 = this.physics.add.sprite(6760, 8322-128, 'courrant3');
            this.courant34.flipX=true
            this.courant35 = this.physics.add.sprite(6760, 8322-64*3, 'courrant3');
            this.courant35.flipX=true

            this.courant36 = this.physics.add.sprite(6200, 7900, 'courrant');
            this.courant36.flipX=true;
            this.courant37 = this.physics.add.sprite(6200, 7964, 'courrant');
            this.courant37.flipX=true;
            this.courant38 = this.physics.add.sprite(6200, 7964+64, 'courrant');
            this.courant38.flipX=true;

            this.courant39 = this.physics.add.sprite(6570+10, 7615, 'courrant2_1');
            this.courant40 = this.physics.add.sprite(6570+64+10, 7615, 'courrant2_1');
            this.courant41 = this.physics.add.sprite(6570+128+10, 7615, 'courrant2_1');
            this.courant42 = this.physics.add.sprite(6570+64*3+10, 7615, 'courrant2_1');
            this.courant43 = this.physics.add.sprite(6570+128*2+10, 7615, 'courrant2_1');

            this.courant44 = this.physics.add.sprite(7350-128*6-70, 9124-130-64, 'courrant3');
            this.courant45 = this.physics.add.sprite(7350-22+128*2+64, 7615+124, 'courrant2_1');
            this.courant45.flipY=true;            
            this.courant46 = this.physics.add.sprite(7350-22+128*2+64, 7615+124*2, 'courrant2_1');
            this.courant46.flipY=true;

            this.courant47 = this.physics.add.sprite(6570+20, 8610-128*4-64, 'courrant3_1');
            this.courant47.flipY=true;

            this.courant48 = this.physics.add.sprite(6760+64*6, 8322-64+64*5-32, 'courrant3');
            this.courant49 = this.physics.add.sprite(6760+64*6, 8322-128+64*5-32, 'courrant3');
            this.courant50 = this.physics.add.sprite(6760+64*6, 8322-64*3+64*5-32, 'courrant3');
            this.courant51 = this.physics.add.sprite(6570-20, 8610-128*3+64, 'courrant2_1');
            this.courant51.flipY=true;
            


            //salle de droite
            this.courant52 = this.physics.add.sprite(6080, 3100, 'courrant3_1');
            this.courant53 = this.physics.add.sprite(6080+64, 3100, 'courrant3_1');
            this.courant54 = this.physics.add.sprite(6080+128, 3100, 'courrant3_1');
            this.courant55 = this.physics.add.sprite(6080+128+64, 3100, 'courrant3_1');
            this.courant56 = this.physics.add.sprite(6080, 3100-124*3, 'courrant3_1');
            this.courant57 = this.physics.add.sprite(6080+64, 3100-124*3, 'courrant3_1');
            this.courant58 = this.physics.add.sprite(6080+128, 3100-124*3, 'courrant3_1');
            this.courant59 = this.physics.add.sprite(6080+128+64, 3100-124*3, 'courrant3_1');
            this.courant60 = this.physics.add.sprite(6080-64-64, 3100+124*2-20, 'courrant3_1');
            this.courant61 = this.physics.add.sprite(6080-64*2-64, 3100+124*2-20, 'courrant3_1');
            this.courant62 = this.physics.add.sprite(6080-64*3-64, 3100+124*2-20, 'courrant3_1');
            this.courant63 = this.physics.add.sprite(6080-64*4-64, 3100+124*2-20, 'courrant3_1');
            this.courant64 = this.physics.add.sprite(5630, 2400, 'courrant3_1');
            this.courant65 = this.physics.add.sprite(5630+64, 2400, 'courrant3_1');
            this.courant66 = this.physics.add.sprite(5630+128, 2400, 'courrant3_1');
            this.courant67 = this.physics.add.sprite(5630-64, 2400, 'courrant3_1');
            this.courant68 = this.physics.add.sprite(5346, 2400+64*4, 'courrant3_1');
            this.courant69 = this.physics.add.sprite(5346+64, 2400+64*4, 'courrant3_1');
            this.courant70 = this.physics.add.sprite(5346+128, 2400+64*4, 'courrant3_1');
            this.courant71 = this.physics.add.sprite(5346+64*3, 2400+64*4, 'courrant3_1');
            this.courant72 = this.physics.add.sprite(5346, 2400+64*8, 'courrant3_1');
            this.courant73 = this.physics.add.sprite(5420+32, 3640+64, 'courrant3');
            this.courant74 = this.physics.add.sprite(5420+32, 3640+128, 'courrant3');
            this.courant75 = this.physics.add.sprite(5420+32+128*4, 3640+128, 'courrant3');
            this.courant76 = this.physics.add.sprite(5420+32+128*2, 3640+64, 'courrant3');
            this.courant77 = this.physics.add.sprite(5420+32+128*2, 3640+128, 'courrant3');
            this.courant78 = this.physics.add.sprite(5346+64, 2400+64*8, 'courrant3_1');
            this.courant79 = this.physics.add.sprite(5346+128, 2400+64*8, 'courrant3_1');
            this.courant80 = this.physics.add.sprite(5346+64*3, 2400+64*8, 'courrant3_1');
            this.courant81 = this.physics.add.sprite(5420+32+128*4, 3640+64, 'courrant3');


            //fonction sens poussée
            this.physics.add.overlap(this.player, this.courant1, this.moveForceGauche, null, this);            
            this.physics.add.overlap(this.player, this.courant2, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant3, this.moveForceGauche, null, this);            
            this.physics.add.overlap(this.player, this.courant4, this.moveForceHaut, null, this);      
            this.physics.add.overlap(this.player, this.courant5, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant6, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant7, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant8, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant9, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant10, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant11, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant12, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant13, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant14, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant15, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant16, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant17, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant18, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant19, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant20, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant21, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant22, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant23, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant24, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant25, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant26, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant27, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant28, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant29, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant30, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant31, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant32, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant33, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant34, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant35, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant36, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant37, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant38, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant39, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant40, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant41, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant42, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant43, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant44, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant45, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant46, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant47, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant48, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant49, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant50, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant51, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant52, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant53, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant54, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant55, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant56, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant57, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant58, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant59, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant60, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant61, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant62, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant63, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant64, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant65, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant66, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant67, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant68, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant69, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant70, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant71, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant72, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant73, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant74, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant75, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant76, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant77, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant78, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant79, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant80, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant81, this.moveForceDroite, null, this);





        }

        this.overideHautPetit = false
        this.overideCote = false
        //creation ennemis
        {
           
            //bullots
            {
                this.bullotD2_B0 = this.physics.add.sprite(640, 2625, 'bullot');
                this.bullotD2_B0.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B0, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B0, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B0.perle = this.perleD1_B0;
                this.bullotD2_B0.soin = this.soinD1_B0;
                this.bullotD2_B0.setScale(1.5)
            }
            {
                this.bullotD2_B1 = this.physics.add.sprite(1150, 2625, 'bullot');
                this.bullotD2_B1.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B1, this.playerFrappeRate, null, this);
                this.perleD2_B1 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD2_B1, this.playerPerle, null, this);
                this.soinD2_B1 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD2_B1, this.playerSoin, null, this);
                this.bullotD2_B1.perle = this.perleD2_B1;
                this.bullotD2_B1.soin = this.soinD2_B1;
                this.bullotD2_B1.setScale(1.5)
            }
            {
                this.bullotD2_B2 = this.physics.add.sprite(640, 2883, 'bullot');
                this.bullotD2_B2.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B2, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B2.perle = this.perleD1_B0;
                this.bullotD2_B2.soin = this.soinD1_B0;
                this.bullotD2_B2.setScale(1.5)
            }
            {
                this.bullotD2_B3 = this.physics.add.sprite(1150, 2883, 'bullot');
                this.bullotD2_B3.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B3, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B3.perle = this.perleD1_B0;
                this.bullotD2_B3.soin = this.soinD1_B0;
                this.bullotD2_B3.setScale(1.5)
            }
            {
                this.bullotD2_B4 = this.physics.add.sprite(640, 3130, 'bullot');
                this.bullotD2_B4.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B4, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B4.perle = this.perleD1_B0;
                this.bullotD2_B4.soin = this.soinD1_B0;
                this.bullotD2_B4.setScale(1.5)
            }
            {
                this.bullotD2_B5 = this.physics.add.sprite(1150, 3130, 'bullot');
                this.bullotD2_B5.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B5, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B5.perle = this.perleD1_B0;
                this.bullotD2_B5.soin = this.soinD1_B0;
                this.bullotD2_B5.setScale(1.5)
            }
            {
                this.bullotD2_B6 = this.physics.add.sprite(640, 3390, 'bullot');
                this.bullotD2_B6.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B6, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B6.perle = this.perleD1_B0;
                this.bullotD2_B6.soin = this.soinD1_B0;
                this.bullotD2_B6.setScale(1.5)
            }
            {
                this.bullotD2_B7 = this.physics.add.sprite(1150, 3390, 'bullot');
                this.bullotD2_B7.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B7, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B7, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B7.perle = this.perleD1_B0;
                this.bullotD2_B7.soin = this.soinD1_B0;
                this.bullotD2_B7.setScale(1.5)
            }
            {
                this.bullotD2_B8 = this.physics.add.sprite(640, 3645, 'bullot');
                this.bullotD2_B8.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B8, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B8, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B8.perle = this.perleD1_B0;
                this.bullotD2_B8.soin = this.soinD1_B0;
                this.bullotD2_B8.setScale(1.5)
            }
            {
                this.bullotD2_B9 = this.physics.add.sprite(1150, 3645, 'bullot');
                this.bullotD2_B9.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD2_B9, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD2_B9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD2_B9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD2_B9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD2_B9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD2_B9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD2_B9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD2_B9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD2_B9, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD2_B9.perle = this.perleD1_B0;
                this.bullotD2_B9.soin = this.soinD1_B0;
                this.bullotD2_B9.setScale(1.5)
            }

            {
                this.crevetteD2_C0 = this.physics.add.sprite(3110, 640, 'crevette');
                this.crevetteD2_C0.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C0, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C0, this.playerFrappeR, null, this);
                this.perleD2_C0 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C0, this.playerPerle, null, this);
                this.soinD2_C0 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C0, this.playerSoin, null, this);
                this.crevetteD2_C0.perle = this.perleD2_C0;
                this.crevetteD2_C0.soin = this.soinD2_C0;
                this.crevetteD2_C0.vivant = true

            }
            {
                this.crevetteD2_C1 = this.physics.add.sprite(3640, 640, 'crevette');
                this.crevetteD2_C1.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C1, this.playerFrappeR, null, this);
                this.perleD2_C1 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C1, this.playerPerle, null, this);
                this.soinD2_C1 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C1, this.playerSoin, null, this);
                this.crevetteD2_C1.perle = this.perleD2_C1;
                this.crevetteD2_C1.soin = this.soinD2_C1;
                this.crevetteD2_C1.vivant = true

            }
            {
                this.crevetteD2_C2 = this.physics.add.sprite(3390, 450, 'crevette');
                this.crevetteD2_C2.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C2, this.playerFrappeR, null, this);
                this.perleD2_C2 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C2, this.playerPerle, null, this);
                this.soinD2_C2 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C2, this.playerSoin, null, this);
                this.crevetteD2_C2.perle = this.perleD2_C2;
                this.crevetteD2_C2.soin = this.soinD2_C2;
                this.crevetteD2_C2.vivant = true

            }

                        {
                this.crevetteD2_C3 = this.physics.add.sprite(8314, 7322, 'crevette');
                this.crevetteD2_C3.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C3, this.playerFrappeR, null, this);
                this.perleD2_C3 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C3, this.playerPerle, null, this);
                this.soinD2_C3 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C3, this.playerSoin, null, this);
                this.crevetteD2_C3.perle = this.perleD2_C3;
                this.crevetteD2_C3.soin = this.soinD2_C3;
                this.crevetteD2_C3.vivant = true

            }
            {
                this.crevetteD2_C4 = this.physics.add.sprite(8000, 3970, 'crevette');
                this.crevetteD2_C4.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C4, this.playerFrappeR, null, this);
                this.perleD2_C4 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C4, this.playerPerle, null, this);
                this.soinD2_C4 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C4, this.playerSoin, null, this);
                this.crevetteD2_C4.perle = this.perleD2_C4;
                this.crevetteD2_C4.soin = this.soinD2_C4;
                this.crevetteD2_C4.vivant = true

            }
            {
                this.crevetteD2_C5 = this.physics.add.sprite(8000, 4480, 'crevette');
                this.crevetteD2_C5.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C5, this.playerFrappeR, null, this);
                this.perleD2_C5 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C5, this.playerPerle, null, this);
                this.soinD2_C5 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C5, this.playerSoin, null, this);
                this.crevetteD2_C5.perle = this.perleD2_C5;
                this.crevetteD2_C5.soin = this.soinD2_C5;
                this.crevetteD2_C5.vivant = true

            }
            {
                this.crevetteD2_C6 = this.physics.add.sprite(8314, 3970, 'crevette');
                this.crevetteD2_C6.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C6, this.playerFrappeR, null, this);
                this.perleD2_C6 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C6, this.playerPerle, null, this);
                this.soinD2_C6 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C6, this.playerSoin, null, this);
                this.crevetteD2_C6.perle = this.perleD2_C6;
                this.crevetteD2_C6.soin = this.soinD2_C6;
                this.crevetteD2_C6.vivant = true

            }
            {
                this.crevetteD2_C7 = this.physics.add.sprite(8314, 4480, 'crevette');
                this.crevetteD2_C7.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C7, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C7, this.playerFrappeR, null, this);
                this.perleD2_C7 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C7, this.playerPerle, null, this);
                this.soinD2_C7 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C7, this.playerSoin, null, this);
                this.crevetteD2_C7.perle = this.perleD2_C7;
                this.crevetteD2_C7.soin = this.soinD2_C7;
                this.crevetteD2_C7.vivant = true

            }
            {
                this.crevetteD2_C8 = this.physics.add.sprite(8700, 3970, 'crevette');
                this.crevetteD2_C8.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C8, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C8, this.playerFrappeR, null, this);
                this.perleD2_C8 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C8, this.playerPerle, null, this);
                this.soinD2_C8 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C8, this.playerSoin, null, this);
                this.crevetteD2_C8.perle = this.perleD2_C8;
                this.crevetteD2_C8.soin = this.soinD2_C8;
                this.crevetteD2_C8.vivant = true

            }
            {
                this.crevetteD2_C9 = this.physics.add.sprite(8700, 4480, 'crevette');
                this.crevetteD2_C9.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C9, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C9, this.playerFrappeR, null, this);
                this.perleD2_C9 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C9, this.playerPerle, null, this);
                this.soinD2_C9 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C9, this.playerSoin, null, this);
                this.crevetteD2_C9.perle = this.perleD2_C9;
                this.crevetteD2_C9.soin = this.soinD2_C9;
                this.crevetteD2_C9.vivant = true

            }
            {
                this.crevetteD2_C10 = this.physics.add.sprite(6180, 2330, 'crevette');
                this.crevetteD2_C10.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C10, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C10, this.playerFrappeR, null, this);
                this.perleD2_C10 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C10, this.playerPerle, null, this);
                this.soinD2_C10 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C10, this.playerSoin, null, this);
                this.crevetteD2_C10.perle = this.perleD2_C10;
                this.crevetteD2_C10.soin = this.soinD2_C10;
                this.crevetteD2_C10.vivant = true

            }
            {
                this.crevetteD2_C11 = this.physics.add.sprite(5784, 2824, 'crevette');
                this.crevetteD2_C11.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C11, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C11, this.playerFrappeR, null, this);
                this.perleD2_C11 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C11, this.playerPerle, null, this);
                this.soinD2_C11 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C11, this.playerSoin, null, this);
                this.crevetteD2_C11.perle = this.perleD2_C11;
                this.crevetteD2_C11.soin = this.soinD2_C11;
                this.crevetteD2_C11.vivant = true

            }
            {
                this.crevetteD2_C12 = this.physics.add.sprite(5444, 3350, 'crevette');
                this.crevetteD2_C12.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C12, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C12, this.playerFrappeR, null, this);
                this.perleD2_C12 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C12, this.playerPerle, null, this);
                this.soinD2_C12 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C12, this.playerSoin, null, this);
                this.crevetteD2_C12.perle = this.perleD2_C12;
                this.crevetteD2_C12.soin = this.soinD2_C12;
                this.crevetteD2_C12.vivant = true

            }
            {
                this.crevetteD2_C13 = this.physics.add.sprite(6230, 3388, 'crevette');
                this.crevetteD2_C13.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C13, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C13, this.playerFrappeR, null, this);
                this.perleD2_C13 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C13, this.playerPerle, null, this);
                this.soinD2_C13 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C13, this.playerSoin, null, this);
                this.crevetteD2_C13.perle = this.perleD2_C13;
                this.crevetteD2_C13.soin = this.soinD2_C13;
                this.crevetteD2_C13.vivant = true

            }
            {
                this.crevetteD2_C14 = this.physics.add.sprite(5416, 3970, 'crevette');
                this.crevetteD2_C14.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C14, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C14, this.playerFrappeR, null, this);
                this.perleD2_C14 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C14, this.playerPerle, null, this);
                this.soinD2_C14 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C14, this.playerSoin, null, this);
                this.crevetteD2_C14.perle = this.perleD2_C14;
                this.crevetteD2_C14.soin = this.soinD2_C14;
                this.crevetteD2_C14.vivant = true

            }
            {
                this.crevetteD2_C15 = this.physics.add.sprite(894, 2427, 'crevette');
                this.crevetteD2_C15.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C15, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C15, this.playerFrappeR, null, this);
                this.perleD2_C15 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C15, this.playerPerle, null, this);
                this.soinD2_C15 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C15, this.playerSoin, null, this);
                this.crevetteD2_C15.perle = this.perleD2_C15;
                this.crevetteD2_C15.soin = this.soinD2_C15;
                this.crevetteD2_C15.vivant = true
                this.crevetteD2_C15.setScale(1.5)

            }
            {
                this.crevetteD2_C16 = this.physics.add.sprite(900, 3000, 'crevette');
                this.crevetteD2_C16.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C16, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C16, this.playerFrappeR, null, this);
                this.perleD2_C16 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C16, this.playerPerle, null, this);
                this.soinD2_C16 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C16, this.playerSoin, null, this);
                this.crevetteD2_C16.perle = this.perleD2_C16;
                this.crevetteD2_C16.soin = this.soinD2_C16;
                this.crevetteD2_C16.vivant = true
                this.crevetteD2_C16.setScale(1.5)

            }
            {
                this.crevetteD2_C17 = this.physics.add.sprite(900, 3530, 'crevette');
                this.crevetteD2_C17.body.immovable = true;
                this.physics.add.collider(this.player, this.crevetteD2_C17, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.crevetteD2_C17, this.playerFrappeR, null, this);
                this.perleD2_C17 = this.physics.add.sprite(3, 17333, 'perle');
                this.physics.add.collider(this.player, this.perleD2_C17, this.playerPerle, null, this);
                this.soinD2_C17 = this.physics.add.sprite(3, 17333, 'soin');
                this.physics.add.collider(this.player, this.soinD2_C17, this.playerSoin, null, this);
                this.crevetteD2_C17.perle = this.perleD2_C17;
                this.crevetteD2_C17.soin = this.soinD2_C17;
                this.crevetteD2_C17.vivant = true
                this.crevetteD2_C17.setScale(1.5)

            }


        }

        //creation boss
        if (this.boss2vaincu == false) {
            {
                this.bossD2_Tenta1 = this.physics.add.sprite(2000, 7750, 'tentacule');
                this.bossD2_Tenta1.body.immovable = true;
                this.bossD2_Tenta1_2 = this.physics.add.sprite(2000, 7750, 'tentacule45');
                this.bossD2_Tenta1_2.setSize(128+64,636+128+128)
                this.bossD2_Tenta1_2.body.immovable = true;

                this.physics.add.collider(this.player, this.bossD2_Tenta1_2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta1_2, this.playerFrappeBossT1, null, this);



                this.physics.add.collider(this.player, this.bossD2_Tenta1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta1, this.playerFrappeBoss, null, this);
                this.bossD2_Tenta1.setScale(1.5)
                this.bossD2_Tenta1.vie = 1;

            }
            {
                this.bossD2_Tenta2 = this.physics.add.sprite(2000, 7750, 'tentacule');
                this.bossD2_Tenta2.body.immovable = true;
                this.bossD2_Tenta2_2 = this.physics.add.sprite(2000, 7750, 'tentacule45');
                this.bossD2_Tenta2_2.setSize(128+64,636+128+128)
                this.bossD2_Tenta2_2.body.immovable = true;

                this.physics.add.collider(this.player, this.bossD2_Tenta2_2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta2_2, this.playerFrappeBossT2, null, this);

                this.physics.add.collider(this.player, this.bossD2_Tenta2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta2, this.playerFrappeBoss, null, this);
                this.bossD2_Tenta2.setScale(1.5)
                this.bossD2_Tenta2.vie = 1;

            }
            {
                this.bossD2_Tenta3 = this.physics.add.sprite(2000, 7750, 'tentacule');
                this.bossD2_Tenta3.body.immovable = true;
                this.bossD2_Tenta3_2 = this.physics.add.sprite(2000, 7750, 'tentacule45');
                this.bossD2_Tenta3_2.setSize(128+64,636+128+128)
                this.bossD2_Tenta3_2.body.immovable = true;

                this.physics.add.collider(this.player, this.bossD2_Tenta3_2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta3_2, this.playerFrappeBossT3, null, this);

                this.physics.add.collider(this.player, this.bossD2_Tenta3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta3, this.playerFrappeBoss, null, this);
                this.bossD2_Tenta3.setScale(1.5)
                this.bossD2_Tenta3.vie = 1;

            }
            {
                this.bossD2_Tenta4 = this.physics.add.sprite(2000, 7750, 'tentacule');
                this.bossD2_Tenta4.body.immovable = true;
                this.bossD2_Tenta4_2 = this.physics.add.sprite(2000, 7750, 'tentacule45');
                this.bossD2_Tenta4_2.setSize(128+64,636+128+128)
                this.bossD2_Tenta4_2.body.immovable = true;

                this.physics.add.collider(this.player, this.bossD2_Tenta4_2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta4_2, this.playerFrappeBossT4, null, this);

                this.physics.add.collider(this.player, this.bossD2_Tenta4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2_Tenta4, this.playerFrappeBoss, null, this);
                this.bossD2_Tenta4.setScale(1.5)
                this.bossD2_Tenta4.vie = 1;

            }
            {
                this.bossD2 = this.physics.add.sprite(2000, 7750-150, 'crane');
                this.bossD2.body.immovable = true;
                this.physics.add.collider(this.player, this.bossD2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bossD2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bossD2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bossD2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.pince2, this.bossD2, this.playerFrappeBoss, null, this);
                this.physics.add.overlap(this.bulles1, this.bossD2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bossD2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bossD2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bossD2, this.playerFrappeRate, null, this);
                this.bossD2.setScale(1.5)
                this.bossD2.vie = 4;
                this.bossD2.setSize(320,246)
                this.bossD2.setOffset(0,128+32)
            }

            
        }




        //soin naturels

        this.soinD1_L0 = this.physics.add.sprite(475, 2366, 'soin');
        this.physics.add.collider(this.player, this.soinD1_L0, this.playerSoin, null, this);
        this.soinD1_L1 = this.physics.add.sprite(1317, 2366, 'soin');
        this.physics.add.collider(this.player, this.soinD1_L1, this.playerSoin, null, this);
        this.soinD1_L2 = this.physics.add.sprite(475, 2562, 'soin');
        this.physics.add.collider(this.player, this.soinD1_L2, this.playerSoin, null, this);
        this.soinD1_L2 = this.physics.add.sprite(1317, 2562, 'soin');
        this.physics.add.collider(this.player, this.soinD1_L2, this.playerSoin, null, this);


        //perles naturelles
        this.perleD2_L0 = this.physics.add.sprite(5960, 8614, 'perle');
        this.physics.add.collider(this.player, this.perleD2_L0, this.playerPerle, null, this);

        this.perleD2_L1 = this.physics.add.sprite(6170, 8614, 'perle');
        this.physics.add.collider(this.player, this.perleD2_L1, this.playerPerle, null, this);
        this.perleD2_L2 = this.physics.add.sprite(5914, 8820, 'perle');
        this.physics.add.collider(this.player, this.perleD2_L2, this.playerPerle, null, this);
        this.perleD2_L3 = this.physics.add.sprite(6170, 8820, 'perle');
        this.physics.add.collider(this.player, this.perleD2_L3, this.playerPerle, null, this);

        this.perleD1_L4 = this.physics.add.sprite(475, 2880, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L4, this.playerPerle, null, this);
        this.perleD1_L5 = this.physics.add.sprite(1317, 2880, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L5, this.playerPerle, null, this);
        this.perleD1_L6 = this.physics.add.sprite(475, 3234, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L6, this.playerPerle, null, this);
        this.perleD1_L7 = this.physics.add.sprite(1317, 3234, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L7, this.playerPerle, null, this);

        //display powerup a rammasser
        //boite message d'indic a faire
        if (this.powerup3 == false) {

        this.gunPowerUp = this.physics.add.sprite(8382, 5952, 'gun');
        this.physics.add.collider(this.player, this.gunPowerUp, this.playerTrouveGun, null, this);
        }


        //anims
        {
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('perso', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'tourni',
                frames: this.anims.generateFrameNumbers('perso', { start: 1, end: 5 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('perso', { start: 12, end: 15 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNumbers('perso', { start: 8, end: 11 }),
                frameRate: 5,
                repeat: -1
            });



            //anim courrant
            this.anims.create({
                key: 'courrant1',
                frames: this.anims.generateFrameNumbers('courrant', { start: 0, end: 8 }),
                frameRate: 15,
                repeat: -1
            });
            this.anims.create({
                key: 'courrant2',
                frames: this.anims.generateFrameNumbers('courrant2', { start: 0, end: 8 }),
                frameRate: 15,
                repeat: -1
            });
            this.anims.create({
                key: 'courrant3',
                frames: this.anims.generateFrameNumbers('courrant3', { start: 0, end: 8 }),
                frameRate: 15,
                repeat: -1
            });
            this.anims.create({
                key: 'courrant2_1',
                frames: this.anims.generateFrameNumbers('courrant2_1', { start: 0, end: 8 }),
                frameRate: 15,
                repeat: -1
            });
            this.anims.create({
                key: 'courrant3_1',
                frames: this.anims.generateFrameNumbers('courrant3_1', { start: 0, end: 8 }),
                frameRate: 15,
                repeat: -1
            });


            //anim epee
            this.anims.create({
                key: 'epee',
                frames: this.anims.generateFrameNumbers('epee', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: 0
            });
            this.anims.create({
                key: 'epee2',
                frames: this.anims.generateFrameNumbers('epee2', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: 0
            });


            //anim leviers et porte
            this.anims.create({
                key: 'porte2chaines',
                frames: [{ key: 'porte', frame: 3 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'portechaineDroite',
                frames: [{ key: 'porte', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'portechaineGauche',
                frames: [{ key: 'porte', frame: 2 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'levierDroite',
                frames: [{ key: 'levier', frame: 0 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'levierGauche',
                frames: [{ key: 'levier', frame: 1 }],
                frameRate: 20
            });




            //anim boss
            this.anims.create({
                key: 'bossVieMaxCache',
                frames: [{ key: 'crane', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'bossVieMaxSorti',
                frames: [{ key: 'crane', frame: 2 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'bossFrappe1Cache',
                frames: [{ key: 'crane', frame: 3 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'bossFrappe1Sorti',
                frames: [{ key: 'crane', frame: 4 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'bossFrappe2Cache',
                frames: [{ key: 'crane', frame: 5 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'bossFrappe2Sorti',
                frames: [{ key: 'crane', frame: 6 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'bossFrappe3Cache',
                frames: [{ key: 'crane', frame: 7 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'bossFrappe3Sorti',
                frames: [{ key: 'crane', frame: 8 }],
                frameRate: 20
            });


            //anim pince
            this.anims.create({
                key: 'pince',
                frames: this.anims.generateFrameNumbers('pince', { start: 0, end: 5 }),
                frameRate: 15,
                repeat: 0
            });
            this.anims.create({
                key: 'pince2',
                frames: this.anims.generateFrameNumbers('pince2', { start: 0, end: 5 }),
                frameRate: 15,
                repeat: 0
            });

            //anim ui
            {

                this.anims.create({
                    key: ' UI1max2actuel1',
                    frames: [{ key: 'UI1', frame: 2 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max2actuel2',
                    frames: [{ key: 'UI1', frame: 3 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel1',
                    frames: [{ key: 'UI1', frame: 4 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel2',
                    frames: [{ key: 'UI1', frame: 5 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel3',
                    frames: [{ key: 'UI1', frame: 6 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max4actuel4',
                    frames: [{ key: 'UI1', frame: 7 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel1',
                    frames: [{ key: 'UI1', frame: 8 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel2',
                    frames: [{ key: 'UI1', frame: 9 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel3',
                    frames: [{ key: 'UI1', frame: 10 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel4',
                    frames: [{ key: 'UI1', frame: 11 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel5',
                    frames: [{ key: 'UI1', frame: 12 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max6actuel6',
                    frames: [{ key: 'UI1', frame: 13 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel1',
                    frames: [{ key: 'UI1', frame: 14 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel2',
                    frames: [{ key: 'UI1', frame: 15 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel3',
                    frames: [{ key: 'UI1', frame: 16 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel4',
                    frames: [{ key: 'UI1', frame: 17 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel5',
                    frames: [{ key: 'UI1', frame: 18 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel6',
                    frames: [{ key: 'UI1', frame: 19 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel7',
                    frames: [{ key: 'UI1', frame: 20 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max8actuel8',
                    frames: [{ key: 'UI1', frame: 21 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel1',
                    frames: [{ key: 'UI1', frame: 22 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel2',
                    frames: [{ key: 'UI1', frame: 23 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel3',
                    frames: [{ key: 'UI1', frame: 24 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel4',
                    frames: [{ key: 'UI1', frame: 25 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel5',
                    frames: [{ key: 'UI1', frame: 26 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel6',
                    frames: [{ key: 'UI1', frame: 27 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel7',
                    frames: [{ key: 'UI1', frame: 28 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel8',
                    frames: [{ key: 'UI1', frame: 29 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel9',
                    frames: [{ key: 'UI1', frame: 30 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI1max10actuel10',
                    frames: [{ key: 'UI1', frame: 31 }],
                    frameRate: 20
                });


            }
            {

                this.anims.create({
                    key: ' UI3max2actuel1',
                    frames: [{ key: 'UI3', frame: 2 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max2actuel2',
                    frames: [{ key: 'UI3', frame: 3 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max4actuel1',
                    frames: [{ key: 'UI3', frame: 4 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max4actuel2',
                    frames: [{ key: 'UI3', frame: 5 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max4actuel3',
                    frames: [{ key: 'UI3', frame: 6 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max4actuel4',
                    frames: [{ key: 'UI3', frame: 7 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max6actuel1',
                    frames: [{ key: 'UI3', frame: 8 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max6actuel2',
                    frames: [{ key: 'UI3', frame: 9 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max6actuel3',
                    frames: [{ key: 'UI3', frame: 10 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max6actuel4',
                    frames: [{ key: 'UI3', frame: 11 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max6actuel5',
                    frames: [{ key: 'UI3', frame: 12 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max6actuel6',
                    frames: [{ key: 'UI3', frame: 13 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel1',
                    frames: [{ key: 'UI3', frame: 14 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel2',
                    frames: [{ key: 'UI3', frame: 15 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel3',
                    frames: [{ key: 'UI3', frame: 16 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel4',
                    frames: [{ key: 'UI3', frame: 17 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel5',
                    frames: [{ key: 'UI3', frame: 18 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel6',
                    frames: [{ key: 'UI3', frame: 19 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel7',
                    frames: [{ key: 'UI3', frame: 20 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max8actuel8',
                    frames: [{ key: 'UI3', frame: 21 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel1',
                    frames: [{ key: 'UI3', frame: 22 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel2',
                    frames: [{ key: 'UI3', frame: 23 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel3',
                    frames: [{ key: 'UI3', frame: 24 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel4',
                    frames: [{ key: 'UI3', frame: 25 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel5',
                    frames: [{ key: 'UI3', frame: 26 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel6',
                    frames: [{ key: 'UI3', frame: 27 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel7',
                    frames: [{ key: 'UI3', frame: 28 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel8',
                    frames: [{ key: 'UI3', frame: 29 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel9',
                    frames: [{ key: 'UI3', frame: 30 }],
                    frameRate: 20
                });
                this.anims.create({
                    key: ' UI3max10actuel10',
                    frames: [{ key: 'UI3', frame: 31 }],
                    frameRate: 20
                });


            }



        }


        this.graphics = this.add.graphics();

        //path des requins
        this.pathD1_0 = new Phaser.Curves.Path(0, 0);
        this.pathD1_0.splineTo([360, 0]);
        this.followD2_0 = this.add.follower(this.pathD1_0, 0, 0);
        this.followD2_0.setScale(0.1);
        this.followD2_0.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });

        this.degatsBossPris = false;

        this.graphics.lineStyle(2, 0xffffff, 1);
        //  this.pathD1_0.draw(this.graphics);
       
       /*
        this.tweens.add({
            targets: this.bossD2_Tenta1,
            rotation: -Math.PI * 2,
            duration: 3000,
            repeat: -1
        });
*/
    }


    update() {

        //update de l'UI si powerup

        //update du compteur de perles
        this.comptPerle.setText(this.counterPerle)


        //effet des leviers et anims
        {
        if(this.levier1.levierActif==true){
            this.courant52.destroy()
            this.courant53.destroy()
            this.courant54.destroy()
            this.courant55.destroy()

        }

        
        if(this.levier2.levierActif==true){
            if(this.levier3.levierActif==true){
                this.porte.destroy()
            }
            else{
                this.porte.anims.play('portechaineDroite', true);

            }

        }
        else if(this.levier3.levierActif==true){
            if(this.levier2.levierActif==true){
                this.porte.destroy()
            }
            else{
                this.porte.anims.play('portechaineGauche', true);

            }
        }
        else{
            this.porte.anims.play('porte2chaines', true);

        }
        if(this.levier1.levierActif==true){
            this.levier1.anims.play('levierGauche', true);
        }
        else{
            this.levier1.anims.play('levierDroite', true);

        }
        if(this.levier2.levierActif==true){
            this.levier2.anims.play('levierGauche', true);
        }
        else{
            this.levier2.anims.play('levierDroite', true);

        }
        if(this.levier3.levierActif==true){
            this.levier3.anims.play('levierGauche', true);
        }
        else{
            this.levier3.anims.play('levierDroite', true);

        }
    }

        //anims des courants
        {

            this.courant1.anims.play('courrant3', true);
            this.courant2.anims.play('courrant1', true);
            this.courant3.anims.play('courrant1', true);
            this.courant4.anims.play('courrant3_1', true);
            this.courant5.anims.play('courrant3_1', true);
            this.courant6.anims.play('courrant3', true);
            this.courant7.anims.play('courrant2_1', true);
            this.courant8.anims.play('courrant2_1', true);
            this.courant9.anims.play('courrant2_1', true);
            this.courant10.anims.play('courrant2_1', true);
            this.courant11.anims.play('courrant2_1', true);
            this.courant12.anims.play('courrant2_1', true);
            this.courant13.anims.play('courrant2_1', true);
            this.courant14.anims.play('courrant3_1', true);
            this.courant15.anims.play('courrant3_1', true);
            this.courant16.anims.play('courrant3', true);
            this.courant17.anims.play('courrant3_1', true);
            this.courant18.anims.play('courrant3_1', true);
            this.courant19.anims.play('courrant3_1', true);
            this.courant20.anims.play('courrant3_1', true);
            this.courant21.anims.play('courrant3_1', true);
            this.courant22.anims.play('courrant3', true);
            this.courant23.anims.play('courrant3', true);
            this.courant24.anims.play('courrant3', true);
            this.courant25.anims.play('courrant3_1', true);
            this.courant26.anims.play('courrant3_1', true);
            this.courant27.anims.play('courrant3_1', true);
            this.courant28.anims.play('courrant3_1', true);
            this.courant29.anims.play('courrant3_1', true);
            this.courant30.anims.play('courrant3_1', true);
            this.courant31.anims.play('courrant3_1', true);
            this.courant32.anims.play('courrant3', true);
            this.courant33.anims.play('courrant3', true);
            this.courant34.anims.play('courrant3', true);
            this.courant35.anims.play('courrant3', true);
            this.courant36.anims.play('courrant1', true);
            this.courant37.anims.play('courrant1', true);
            this.courant38.anims.play('courrant1', true);
            this.courant39.anims.play('courrant2_1', true);
            this.courant40.anims.play('courrant2_1', true);
            this.courant41.anims.play('courrant2_1', true);
            this.courant42.anims.play('courrant2_1', true);
            this.courant43.anims.play('courrant2_1', true);
            this.courant44.anims.play('courrant3', true);
            this.courant45.anims.play('courrant2_1', true);
            this.courant46.anims.play('courrant2_1', true);
            this.courant47.anims.play('courrant3_1', true);
            this.courant48.anims.play('courrant3', true);
            this.courant49.anims.play('courrant3', true);
            this.courant50.anims.play('courrant3', true);
            this.courant51.anims.play('courrant2_1', true);

            if(this.levier1.levierActif==false){
                this.courant52.anims.play('courrant3_1', true);
                this.courant53.anims.play('courrant3_1', true);
                this.courant54.anims.play('courrant3_1', true);
                this.courant55.anims.play('courrant3_1', true);
            }
            this.courant56.anims.play('courrant3_1', true);
            this.courant57.anims.play('courrant3_1', true);
            this.courant58.anims.play('courrant3_1', true);
            this.courant59.anims.play('courrant3_1', true);
            this.courant60.anims.play('courrant3_1', true);
            this.courant61.anims.play('courrant3_1', true);
            this.courant62.anims.play('courrant3_1', true);
            this.courant63.anims.play('courrant3_1', true);
            this.courant64.anims.play('courrant3_1', true);
            this.courant65.anims.play('courrant3_1', true);
            this.courant66.anims.play('courrant3_1', true);
            this.courant67.anims.play('courrant3_1', true);
            this.courant68.anims.play('courrant3_1', true);
            this.courant69.anims.play('courrant3_1', true);
            this.courant70.anims.play('courrant3_1', true);
            this.courant71.anims.play('courrant3_1', true);
            this.courant72.anims.play('courrant3_1', true);
            this.courant73.anims.play('courrant3', true);
            this.courant74.anims.play('courrant3', true);
            this.courant75.anims.play('courrant3', true);
            this.courant76.anims.play('courrant3', true);
            this.courant77.anims.play('courrant3', true);
            this.courant78.anims.play('courrant3_1', true);
            this.courant79.anims.play('courrant3_1', true);
            this.courant80.anims.play('courrant3_1', true);
            this.courant81.anims.play('courrant3', true);
            
        }


        //anim boss
        if (this.bossD2_Tenta1.vie>0) {
            this.bossD2_Tenta1.setAngle(this.followD2_0.x)
        }
        else{
            this.bossD2_Tenta1.destroy()
            this.bossD2_Tenta1_2.destroy()
        }
        if (this.bossD2_Tenta2.vie>0) {
            this.bossD2_Tenta2.setAngle(this.followD2_0.x+90)
        }
        else{
            this.bossD2_Tenta2.destroy()
            this.bossD2_Tenta2_2.destroy()

        }
        if (this.bossD2_Tenta3.vie>0) {
            this.bossD2_Tenta3.setAngle(this.followD2_0.x+180)
        }
        else{
            this.bossD2_Tenta3.destroy()
            this.bossD2_Tenta3_2.destroy()

        }
        if (this.bossD2_Tenta4.vie>0) {
            this.bossD2_Tenta4.setAngle(this.followD2_0.x+270)
        }
        else{
            this.bossD2_Tenta4.destroy()
            this.bossD2_Tenta4_2.destroy()

        }

       // this.bossD2_Tenta1.body.setAngle(this.followD2_0.x)

        if (this.boss2vaincu == false) {

          

            
            if (this.bossD2.vie == 4) {
                this.bossD2.anims.play('bossVieMaxCache', true);

            }
            else if(this.bossD2.vie == 3 && this.degatsBossPris==true){
                this.bossD2.anims.play('bossFrappe1Sorti', true);
            }
            else if(this.bossD2.vie == 3 && this.degatsBossPris==false){
                this.bossD2.anims.play('bossFrappe1Cache', true);
            }
            else if(this.bossD2.vie == 2 && this.degatsBossPris==true){
                this.bossD2.anims.play('bossFrappe2Sorti', true);
            }
            else if(this.bossD2.vie == 2 && this.degatsBossPris==false){
                this.bossD2.anims.play('bossFrappe2Cache', true);
            }
            else if(this.bossD2.vie == 1 && this.degatsBossPris==true){
                this.bossD2.anims.play('bossFrappe3Sorti', true);
            }
            else if(this.bossD2.vie == 1 && this.degatsBossPris==false){
                this.bossD2.anims.play('bossFrappe3Cache', true);
            }
            else {
                this.boss2vaincu=true
                
                this.bossD2.destroy()
            }

            
        }

        if(this.boss2vaincu==true){
            this.scene.start("menu", { victoire: true });
        }


        //game over
        if (this.vieActuelle <= 0) {
            console.log("change")
            this.scene.start("menu", { etat: true });
        }


        //param des changemetns de salles
        {

            //de 1 vers abysses
            if ((this.player.x < 980 && this.player.x > 790) && (this.player.y < 1150 && this.player.y > 1023)) {
                this.scene.start("abysses", { origin: this.origine, powerup2: this.powerup2, powerup3: this.powerup3, vieA: this.vieActuelle, vieM: this.vieMax, counterPerle: this.counterPerle, boss1: this.boss1vaincu, boss2: this.boss2vaincu, tabBoostVie: this.boostViePrise });



            }

            //de 1 vers 2
            if ((this.player.x < 980 && this.player.x > 790) && (this.player.y < 250 && this.player.y > 120)) {


                this.cameras.main.centerOn(3390, 640)
                this.player.x = 3390
                this.player.y = 925
            }


            //de 2 vers 1
            if ((this.player.x < 3500 && this.player.x > 3270) && (this.player.y < 1150 && this.player.y > 1023)) {

                this.cameras.main.centerOn(900, 640)

                this.player.x = 900
                this.player.y = 340

            }


            //de 2 vers 3
            if ((this.player.x < 3500 && this.player.x > 3270) && (this.player.y < 250 && this.player.y > 120)) {
                this.cameras.main.centerOn(900, 3130)

                this.player.x = 900
                this.player.y = 4040
                this.cameras.main.setZoom(0.45)
                this.cameras.main.startFollow(this.player);

                this.ui.x = -120
                this.ui.y = -200
                this.comptPerle.x = -235
                this.comptPerle.y = -125
            }

            //de 3 vers 2
            if ((this.player.x < 980 && this.player.x > 790) && (this.player.y < 4200 && this.player.y > 4100)) {
                this.player.y = 350
                this.cameras.main.centerOn(3390, 640)
                this.cameras.main.stopFollow(this.player)

                this.player.x = 3390
                this.cameras.main.setZoom(0.6)
                this.ui.x = -100
                this.ui.y = -80
                this.comptPerle.x = -220
                this.comptPerle.y = 0
            }



            //de 3 vers 4 (boss) 
            if ((this.player.x < 980 && this.player.x > 790) && (this.player.y < 2230 && this.player.y > 2100)) {
                this.player.x = 1930
                this.player.y = 8460
            }






            //de 2 vers 5
            if ((this.player.x < 4030 && this.player.x > 3900) && (this.player.y < 760 && this.player.y > 540)) {
                this.cameras.main.centerOn(8300, 640)
                this.player.x = 7880
                this.player.y = 640

            }

            //de 5 vers 2
            if ((this.player.x < 7800 && this.player.x > 7660) && (this.player.y < 760 && this.player.y > 540)) {
                this.cameras.main.centerOn(3390, 640)
                this.player.x = 3830
                this.player.y = 640

            }

            //de 5 vers 6
            if ((this.player.x < 8430 && this.player.x > 8220) && (this.player.y < 250 && this.player.y > 120)) {
                this.cameras.main.centerOn(5820, 3130)
                this.player.x = 5820
                this.player.y = 4030

                this.cameras.main.setZoom(0.45)
                this.cameras.main.startFollow(this.player);

                this.ui.x = -120
                this.ui.y = -200
                this.comptPerle.x = -235
                this.comptPerle.y = -125

            }

            //de 6 vers 5
            if ((this.player.x < 5900 && this.player.x > 5700) && (this.player.y < 4200 && this.player.y > 4100)) {
                this.player.y = 350
                this.cameras.main.centerOn(8300, 640)
                this.cameras.main.stopFollow(this.player)

                this.player.x = 8300
                this.cameras.main.setZoom(0.6)
                this.ui.x = -100
                this.ui.y = -80
                this.comptPerle.x = -220
                this.comptPerle.y = 0
            }


            //de 6 vers 7
            if ((this.player.x < 6500 && this.player.x > 6340) && (this.player.y < 3820 && this.player.y > 3620)) {
                this.player.y = 4225
                this.cameras.main.centerOn(8320, 4225)
                this.cameras.main.stopFollow(this.player)

                this.player.x = 7888
                this.cameras.main.setZoom(0.6)
                this.ui.x = -100
                this.ui.y = -80
                this.comptPerle.x = -220
                this.comptPerle.y = 0
            }


            //de 7 vers 6
            if ((this.player.x < 7800 && this.player.x > 7650) && (this.player.y < 4300 && this.player.y > 4100)) {
                this.cameras.main.centerOn(5840, 3130)
                this.player.x = 6230
                this.player.y = 3750

                this.cameras.main.setZoom(0.45)
                this.cameras.main.startFollow(this.player);

                this.ui.x = -120
                this.ui.y = -200
                this.comptPerle.x = -235
                this.comptPerle.y = -125

            }

            //de 6 vers 8
            if ((this.player.x < 6500 && this.player.x > 6340) && (this.player.y < 3180 && this.player.y > 2980)) {
                this.player.y = 2430
                this.cameras.main.centerOn(8300, 2430)
                this.cameras.main.stopFollow(this.player)

                this.player.x = 7920
                this.cameras.main.setZoom(0.6)
                this.ui.x = -100
                this.ui.y = -80
                this.comptPerle.x = -220
                this.comptPerle.y = 0
            }

            //de 8 vers 6
            if ((this.player.x < 7800 && this.player.x > 7650) && (this.player.y < 2520 && this.player.y > 2320)) {
                this.cameras.main.centerOn(5840, 3130)
                this.player.x = 6230
                this.player.y = 3100

                this.cameras.main.setZoom(0.45)
                this.cameras.main.startFollow(this.player);

                this.ui.x = -120
                this.ui.y = -200
                this.comptPerle.x = -235
                this.comptPerle.y = -125

            }


            //de 6 vers 9
            if ((this.player.x < 6500 && this.player.x > 6340) && (this.player.y < 2540 && this.player.y > 2340)) {
                this.player.y = 5950
                this.cameras.main.centerOn(8300, 5950)
                this.cameras.main.stopFollow(this.player)

                this.player.x = 7930
                this.cameras.main.setZoom(0.6)
                this.ui.x = -100
                this.ui.y = -80
                this.comptPerle.x = -220
                this.comptPerle.y = 0
            }


            //de 9 vers 6
            if ((this.player.x < 7800 && this.player.x > 7650) && (this.player.y < 6040 && this.player.y > 5840)) {
                this.cameras.main.centerOn(5840, 3130)
                this.player.x = 6230
                this.player.y = 2440

                this.cameras.main.setZoom(0.45)
                this.cameras.main.startFollow(this.player);

                this.ui.x = -120
                this.ui.y = -200
                this.comptPerle.x = -235
                this.comptPerle.y = -125

            }




            //de 2 vers 10
            if ((this.player.x < 2870 && this.player.x > 2780) && (this.player.y < 760 && this.player.y > 540)) {
                this.cameras.main.centerOn(5824, 640)
                this.player.x = 6240
                this.player.y = 640

            }

            //de 10 vers 2
            if ((this.player.x < 6440 && this.player.x > 6330) && (this.player.y < 760 && this.player.y > 540)) {
                this.cameras.main.centerOn(3390, 640)
                this.player.x = 2950
                this.player.y = 640

            }





            //de 10 vers 11
            if ((this.player.x < 5920 && this.player.x > 5720) && (this.player.y < 250 && this.player.y > 120)) {
                this.cameras.main.centerOn(3390, 3127)
                this.player.x = 3390
                this.player.y = 4030

                this.cameras.main.setZoom(0.45)
                this.cameras.main.startFollow(this.player);

                this.ui.x = -120
                this.ui.y = -200
                this.comptPerle.x = -235
                this.comptPerle.y = -125

            }

            //de 11 vers 10
            if ((this.player.x < 3475 && this.player.x > 3270) && (this.player.y < 4200 && this.player.y > 4100)) {
                this.player.y = 350
                this.cameras.main.centerOn(5824, 640)
                this.cameras.main.stopFollow(this.player)

                this.player.x = 5824
                this.cameras.main.setZoom(0.6)
                this.ui.x = -100
                this.ui.y = -80
                this.comptPerle.x = -220
                this.comptPerle.y = 0
            }


            //de 11 vers 12
            if ((this.player.x < 3475 && this.player.x > 3270) && (this.player.y < 2240 && this.player.y > 2110)) {
                this.player.x = 7800
                this.player.y = 9080
            }

            //de 12 vers 11
            if ((this.player.x < 7900 && this.player.x > 7680) && (this.player.y < 9300 && this.player.y > 9150)) {
                this.player.x = 3390
                this.player.y = 2300
            }



        }


        //mouvement des ennemis
        if (this.crevetteD2_C0.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C0.x, this.crevetteD2_C0.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C0.setVelocity(this.player.x - this.crevetteD2_C0.x, this.player.y - this.crevetteD2_C0.y);
            } else {
                this.crevetteD2_C0.setVelocity(0);
            }
        }

        if (this.crevetteD2_C1.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C1.x, this.crevetteD2_C1.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C1.setVelocity(this.player.x - this.crevetteD2_C1.x, this.player.y - this.crevetteD2_C1.y);
            } else {
                this.crevetteD2_C1.setVelocity(0);
            }
        }
        if (this.crevetteD2_C2.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C2.x, this.crevetteD2_C2.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C2.setVelocity(this.player.x - this.crevetteD2_C2.x, this.player.y - this.crevetteD2_C2.y);
            } else {
                this.crevetteD2_C2.setVelocity(0);
            }
        }
        if (this.crevetteD2_C3.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C3.x, this.crevetteD2_C3.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C3.setVelocity(this.player.x - this.crevetteD2_C3.x, this.player.y - this.crevetteD2_C3.y);
            } else {
                this.crevetteD2_C3.setVelocity(0);
            }
        }
        if (this.crevetteD2_C4.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C4.x, this.crevetteD2_C4.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C4.setVelocity(this.player.x - this.crevetteD2_C4.x, this.player.y - this.crevetteD2_C4.y);
            } else {
                this.crevetteD2_C4.setVelocity(0);
            }
        }
        if (this.crevetteD2_C5.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C5.x, this.crevetteD2_C5.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C5.setVelocity(this.player.x - this.crevetteD2_C5.x, this.player.y - this.crevetteD2_C5.y);
            } else {
                this.crevetteD2_C5.setVelocity(0);
            }
        }
        if (this.crevetteD2_C6.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C6.x, this.crevetteD2_C6.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C6.setVelocity(this.player.x - this.crevetteD2_C6.x, this.player.y - this.crevetteD2_C6.y);
            } else {
                this.crevetteD2_C6.setVelocity(0);
            }
        }
        if (this.crevetteD2_C7.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C7.x, this.crevetteD2_C7.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C7.setVelocity(this.player.x - this.crevetteD2_C7.x, this.player.y - this.crevetteD2_C7.y);
            } else {
                this.crevetteD2_C7.setVelocity(0);
            }
        }
        if (this.crevetteD2_C8.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C8.x, this.crevetteD2_C8.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C8.setVelocity(this.player.x - this.crevetteD2_C8.x, this.player.y - this.crevetteD2_C8.y);
            } else {
                this.crevetteD2_C8.setVelocity(0);
            }
        }
        if (this.crevetteD2_C9.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C9.x, this.crevetteD2_C9.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C9.setVelocity(this.player.x - this.crevetteD2_C9.x, this.player.y - this.crevetteD2_C9.y);
            } else {
                this.crevetteD2_C9.setVelocity(0);
            }
        }
        if (this.crevetteD2_C10.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C10.x, this.crevetteD2_C10.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C10.setVelocity(this.player.x - this.crevetteD2_C10.x, this.player.y - this.crevetteD2_C10.y);
            } else {
                this.crevetteD2_C10.setVelocity(0);
            }
        }
        if (this.crevetteD2_C11.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C11.x, this.crevetteD2_C11.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C11.setVelocity(this.player.x - this.crevetteD2_C11.x, this.player.y - this.crevetteD2_C11.y);
            } else {
                this.crevetteD2_C11.setVelocity(0);
            }
        }
        if (this.crevetteD2_C12.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C12.x, this.crevetteD2_C12.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C12.setVelocity(this.player.x - this.crevetteD2_C12.x, this.player.y - this.crevetteD2_C12.y);
            } else {
                this.crevetteD2_C12.setVelocity(0);
            }
        }
        if (this.crevetteD2_C13.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C13.x, this.crevetteD2_C13.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C13.setVelocity(this.player.x - this.crevetteD2_C13.x, this.player.y - this.crevetteD2_C13.y);
            } else {
                this.crevetteD2_C13.setVelocity(0);
            }
        }
        if (this.crevetteD2_C14.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C14.x, this.crevetteD2_C14.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C14.setVelocity(this.player.x - this.crevetteD2_C14.x, this.player.y - this.crevetteD2_C14.y);
            } else {
                this.crevetteD2_C14.setVelocity(0);
            }
        }
        if (this.crevetteD2_C15.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C15.x, this.crevetteD2_C15.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C15.setVelocity(this.player.x - this.crevetteD2_C15.x, this.player.y - this.crevetteD2_C15.y);
            } else {
                this.crevetteD2_C15.setVelocity(0);
            }
        }
        if (this.crevetteD2_C16.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C16.x, this.crevetteD2_C16.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C16.setVelocity(this.player.x - this.crevetteD2_C16.x, this.player.y - this.crevetteD2_C16.y);
            } else {
                this.crevetteD2_C16.setVelocity(0);
            }
        }
        if (this.crevetteD2_C17.vivant == true) {
            const distance = Phaser.Math.Distance.Between(this.crevetteD2_C17.x, this.crevetteD2_C17.y, this.player.x, this.player.y);
            if (distance < 300) {
                this.crevetteD2_C17.setVelocity(this.player.x - this.crevetteD2_C17.x, this.player.y - this.crevetteD2_C17.y);
            } else {
                this.crevetteD2_C17.setVelocity(0);
            }
        }




        //affichage des attaques

        if (this.keyA.isDown && this.attk) {
            this.attk = false;
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();


            if (this.lastFacingDirection == "right") {
                this.epee.anims.play('epee', true);
                this.epee.x = this.player.x + 70
                this.epee.y = this.player.y
                this.epee.setAngle(0)

            }
            else if (this.lastFacingDirection == "left") {
                this.epee.anims.play('epee', true);
                this.epee.x = this.player.x - 70
                this.epee.y = this.player.y
                this.epee.setAngle(180)

            }

            else if (this.lastFacingDirection == "up") {
                this.epee2.anims.play('epee2', true);
                this.epee2.x = this.player.x
                this.epee2.y = this.player.y - 70
                this.epee2.setAngle(180);

            }
            else if (this.lastFacingDirection == "down") {
                this.epee2.anims.play('epee2', true);
                this.epee2.x = this.player.x;
                this.epee2.y = this.player.y + 70;
                this.epee2.setAngle(0);
            }


            setTimeout(() => {
                this.input.keyboard.enabled = true;
                this.epee.x = 0;
                this.epee.y = 15000;
                this.epee2.x = 0;
                this.epee2.y = 15000;
                this.attk = true;
            }, 550);
        }


        if (this.keyZ.isDown && this.attk && this.powerup2) {
            this.attk = false;
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();


            if (this.lastFacingDirection == "right") {
                this.pince.anims.play('pince', true);
                this.pince.x = this.player.x + 110
                this.pince.y = this.player.y
                this.pince.setAngle(0)

            }
            else if (this.lastFacingDirection == "left") {
                this.pince.anims.play('pince', true);
                this.pince.x = this.player.x - 110
                this.pince.y = this.player.y
                this.pince.setAngle(180)

            }

            else if (this.lastFacingDirection == "up") {
                this.pince2.anims.play('pince2', true);
                this.pince2.x = this.player.x
                this.pince2.y = this.player.y - 110
                this.pince2.setAngle(180);

            }
            else if (this.lastFacingDirection == "down") {
                this.pince2.anims.play('pince2', true);
                this.pince2.x = this.player.x;
                this.pince2.y = this.player.y + 110;
                this.pince2.setAngle(0);
            }


            setTimeout(() => {
                this.input.keyboard.enabled = true;
                this.pince.x = 0;
                this.pince.y = 6200;
                this.pince2.x = 0;
                this.pince2.y = 6200;
                this.attk = true;
            }, 600);
        }

        if (this.keyE.isDown && this.attk && this.powerup3) {
            this.attk = false;
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();



            if (this.lastFacingDirection == "right") {
                this.gun.x = this.player.x + 70
                this.gun.y = this.player.y
                this.gun.setAngle(0)
                this.gun.flipX = false;
                this.gun.flipY = false;
                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x + 70 + 64
                    this.bulles1.y = this.player.y
                    this.bulles1.setAngle(0)
                    this.bulles1.setVelocityX(350);
                    this.bulles1.setVelocityY(0);
                    this.bulleUtil = this.bulleUtil + 1
                    setTimeout(() => {
                        this.bulles1.x = 0;
                        this.bulles1.y = 7000;
                        this.bulles1.setVelocityX(0);
                        this.bulles1.setVelocityY(0);

                    }, 4000);
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x + 70 + 64
                    this.bulles2.y = this.player.y
                    this.bulles2.setAngle(0)
                    this.bulles2.setVelocityX(350);
                    this.bulles2.setVelocityY(0);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles2.x = 0;
                        this.bulles2.y = 7000;
                        this.bulles2.setVelocityX(0);
                        this.bulles2.setVelocityY(0);

                    }, 4000);
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x + 70 + 64
                    this.bulles3.y = this.player.y
                    this.bulles3.setAngle(0)
                    this.bulles3.setVelocityX(350);
                    this.bulles3.setVelocityY(0);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles3.x = 0;
                        this.bulles3.y = 7000;
                        this.bulles3.setVelocityX(0);
                        this.bulles3.setVelocityY(0);

                    }, 4000);
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x + 70 + 64
                    this.bulles4.y = this.player.y
                    this.bulles4.setAngle(0)
                    this.bulles4.setVelocityX(350);
                    this.bulles4.setVelocityY(0);
                    this.bulleUtil = 0;
                    setTimeout(() => {
                        this.bulles4.x = 0;
                        this.bulles4.y = 7000;
                        this.bulles4.setVelocityX(0);
                        this.bulles4.setVelocityY(0);

                    }, 4000);
                }


            }
            else if (this.lastFacingDirection == "left") {
                this.gun.x = this.player.x - 70
                this.gun.y = this.player.y
                this.gun.flipY = true;
                this.gun.setAngle(180)


                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x - 70 - 64
                    this.bulles1.y = this.player.y
                    this.bulles1.setAngle(180)
                    this.bulles1.setVelocityX(-350);
                    this.bulles1.setVelocityY(0);
                    this.bulleUtil = this.bulleUtil + 1
                    setTimeout(() => {
                        this.bulles1.x = 0;
                        this.bulles1.y = 7000;
                        this.bulles1.setVelocityX(0);
                        this.bulles1.setVelocityY(0);

                    }, 4000);
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x - 70 - 64
                    this.bulles2.y = this.player.y
                    this.bulles2.setAngle(180)
                    this.bulles2.setVelocityX(-350);
                    this.bulles2.setVelocityY(0);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles2.x = 0;
                        this.bulles2.y = 7000;
                        this.bulles2.setVelocityX(0);
                        this.bulles2.setVelocityY(0);

                    }, 4000);
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x - 70 - 64
                    this.bulles3.y = this.player.y
                    this.bulles3.setAngle(180)
                    this.bulles3.setVelocityX(-350);
                    this.bulles3.setVelocityY(0);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles3.x = 0;
                        this.bulles3.y = 7000;
                        this.bulles3.setVelocityX(0);
                        this.bulles3.setVelocityY(0);

                    }, 4000);
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x - 70 - 64
                    this.bulles4.y = this.player.y
                    this.bulles4.setAngle(180)
                    this.bulles4.setVelocityX(-350);
                    this.bulles4.setVelocityY(0);
                    this.bulleUtil = 0;
                    setTimeout(() => {
                        this.bulles4.x = 0;
                        this.bulles4.y = 7000;
                        this.bulles4.setVelocityX(0);
                        this.bulles4.setVelocityY(0);

                    }, 4000);
                }


            }

            else if (this.lastFacingDirection == "up") {
                this.gun.x = this.player.x
                this.gun.y = this.player.y - 70
                this.gun.setAngle(280);
                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x
                    this.bulles1.y = this.player.y - 70 - 64
                    this.bulles1.setAngle(280)
                    this.bulles1.setVelocityX(0);
                    this.bulles1.setVelocityY(-350);
                    this.bulleUtil = this.bulleUtil + 1
                    setTimeout(() => {
                        this.bulles1.x = 0;
                        this.bulles1.y = 7000;
                        this.bulles1.setVelocityX(0);
                        this.bulles1.setVelocityY(0);

                    }, 3000);
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x
                    this.bulles2.y = this.player.y - 70 - 64
                    this.bulles2.setAngle(280)
                    this.bulles2.setVelocityX(0);
                    this.bulles2.setVelocityY(-350);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles2.x = 0;
                        this.bulles2.y = 7000;
                        this.bulles2.setVelocityX(0);
                        this.bulles2.setVelocityY(0);

                    }, 3000);
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x
                    this.bulles3.y = this.player.y - 70 - 64
                    this.bulles3.setAngle(280)
                    this.bulles3.setVelocityX(0);
                    this.bulles3.setVelocityY(-350);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles3.x = 0;
                        this.bulles3.y = 7000;
                        this.bulles3.setVelocityX(0);
                        this.bulles3.setVelocityY(0);

                    }, 3000);
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x
                    this.bulles4.y = this.player.y - 70 - 64
                    this.bulles4.setAngle(280)
                    this.bulles4.setVelocityX(0);
                    this.bulles4.setVelocityY(-350);
                    this.bulleUtil = 0;
                    setTimeout(() => {
                        this.bulles4.x = 0;
                        this.bulles4.y = 7000;
                        this.bulles4.setVelocityX(0);
                        this.bulles4.setVelocityY(0);

                    }, 3000);
                }






            }
            else if (this.lastFacingDirection == "down") {
                this.gun.x = this.player.x;
                this.gun.y = this.player.y + 70;
                this.gun.setAngle(90);



                if (this.bulleUtil == 0) {
                    this.bulles1.x = this.player.x
                    this.bulles1.y = this.player.y + 70 + 64
                    this.bulles1.setAngle(90)
                    this.bulles1.setVelocityX(0);
                    this.bulles1.setVelocityY(350);
                    this.bulleUtil = this.bulleUtil + 1
                    setTimeout(() => {
                        this.bulles1.x = 0;
                        this.bulles1.y = 7000;
                        this.bulles1.setVelocityX(0);
                        this.bulles1.setVelocityY(0);

                    }, 3000);
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x
                    this.bulles2.y = this.player.y + 70 + 64
                    this.bulles2.setAngle(90)
                    this.bulles2.setVelocityX(0);
                    this.bulles2.setVelocityY(350);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles2.x = 0;
                        this.bulles2.y = 7000;
                        this.bulles2.setVelocityX(0);
                        this.bulles2.setVelocityY(0);

                    }, 3000);
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x
                    this.bulles3.y = this.player.y + 70 + 64
                    this.bulles3.setAngle(90)
                    this.bulles3.setVelocityX(0);
                    this.bulles3.setVelocityY(350);
                    this.bulleUtil++
                    setTimeout(() => {
                        this.bulles3.x = 0;
                        this.bulles3.y = 7000;
                        this.bulles3.setVelocityX(0);
                        this.bulles3.setVelocityY(0);

                    }, 3000);
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x
                    this.bulles4.y = this.player.y + 70 + 64
                    this.bulles4.setAngle(90)
                    this.bulles4.setVelocityX(0);
                    this.bulles4.setVelocityY(350);
                    this.bulleUtil = 0;
                    setTimeout(() => {
                        this.bulles4.x = 0;
                        this.bulles4.y = 7000;
                        this.bulles4.setVelocityX(0);
                        this.bulles4.setVelocityY(0);

                    }, 3000);
                }



            }


            setTimeout(() => {
                this.input.keyboard.enabled = true;
                this.gun.x = 0;
                this.gun.y = 6200;
                this.gun.x = 0;
                this.gun.y = 6200;
                this.attk = true;
            }, 300);
        }





        //controles
        {
            if (this.cursors.left.isDown && this.courantActif == false) {
                this.player.setVelocityX(-300);
                this.player.anims.play('left', true);
                this.lastFacingDirection = "left"

            }
            else if (this.cursors.right.isDown && this.courantActif == false) {
                this.player.setVelocityX(300);
                this.player.anims.play('right', true);
                this.lastFacingDirection = "right"

            }
            else if (this.courantActif == false) {
                this.player.setVelocityX(0);
            }


            if (this.cursors.up.isDown && this.courantActif == false) {
                this.player.setVelocityY(-300);
                this.player.anims.play('up', true);
                this.lastFacingDirection = "up";


            }
            else if (this.cursors.down.isDown && this.courantActif == false) {
                this.player.setVelocityY(350);
                this.player.anims.play('down', true);
                this.lastFacingDirection = "down";


            }
            else if (this.courantActif == false) {
                this.player.setVelocityY(0);
            }

            if (this.cursors.up.isDown && this.cursors.left.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('up', true); //et animation => droite

            }
            else if (this.cursors.up.isDown && this.cursors.right.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('up', true); //et animation => droite

            }
            else if (this.cursors.down.isDown && this.cursors.left.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('down', true); //et animation => droite

            }
            else if (this.cursors.down.isDown && this.cursors.right.isDown && this.courantActif == false) {
                //ajouter anim diagonales si j'ai le temps
                this.player.anims.play('down', true); //et animation => droite

            }

        }

        //gestion UI

        if(this.powerup3==false){
        {
            if (this.vieMax == 2 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max2actuel1', true);

            }
            else if (this.vieMax == 2 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max2actuel2', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max4actuel1', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max4actuel2', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max4actuel3', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max4actuel4', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max6actuel1', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max6actuel2', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max6actuel3', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max6actuel4', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI1max6actuel5', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI1max6actuel6', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max8actuel1', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max8actuel2', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max8actuel3', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max8actuel4', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI1max8actuel5', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI1max8actuel6', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 7) {
                this.ui.anims.play(' UI1max8actuel7', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 8) {
                this.ui.anims.play(' UI1max8actuel8', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI1max10actuel1', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI1max10actuel2', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI1max10actuel3', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI1max10actuel4', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI1max10actuel5', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI1max10actuel6', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 7) {
                this.ui.anims.play(' UI1max10actuel7', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 8) {
                this.ui.anims.play(' UI1max10actuel8', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 9) {
                this.ui.anims.play(' UI1max10actuel9', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 10) {
                this.ui.anims.play(' UI1max10actuel10', true);

            }



        }
    } else {
        {
            if (this.vieMax == 2 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI3max2actuel1', true);

            }
            else if (this.vieMax == 2 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI3max2actuel2', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI3max4actuel1', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI3max4actuel2', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI3max4actuel3', true);

            }
            else if (this.vieMax == 4 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI3max4actuel4', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI3max6actuel1', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI3max6actuel2', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI3max6actuel3', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI3max6actuel4', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI3max6actuel5', true);

            }
            else if (this.vieMax == 6 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI3max6actuel6', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI3max8actuel1', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI3max8actuel2', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI3max8actuel3', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI3max8actuel4', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI3max8actuel5', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI3max8actuel6', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 7) {
                this.ui.anims.play(' UI3max8actuel7', true);

            }
            else if (this.vieMax == 8 && this.vieActuelle == 8) {
                this.ui.anims.play(' UI3max8actuel8', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 1) {
                this.ui.anims.play(' UI3max10actuel1', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 2) {
                this.ui.anims.play(' UI3max10actuel2', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 3) {
                this.ui.anims.play(' UI3max10actuel3', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 4) {
                this.ui.anims.play(' UI3max10actuel4', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 5) {
                this.ui.anims.play(' UI3max10actuel5', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 6) {
                this.ui.anims.play(' UI3max10actuel6', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 7) {
                this.ui.anims.play(' UI3max10actuel7', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 8) {
                this.ui.anims.play(' UI3max10actuel8', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 9) {
                this.ui.anims.play(' UI3max10actuel9', true);

            }
            else if (this.vieMax == 10 && this.vieActuelle == 10) {
                this.ui.anims.play(' UI3max10actuel10', true);

            }



        }
    }
    }


    render() {

        game.debug.cameraInfo(game.camera, 32, 32);



    }

    moveForceDroite() {

        if (!this.overideHautPetit) {
            if (!this.overideCote) {


                this.player.setVelocityX(0)
                this.player.setVelocityY(0)
                this.cursors.right.reset();
                this.cursors.left.reset();
                this.cursors.up.reset();
                this.cursors.down.reset();
                this.cursors.enabled = false;
                this.courantActif = true
                this.player.setVelocityX(700)

                setTimeout(() => {
                    this.courantActif = false
                    this.player.setVelocityX(0)
                    this.cursors.enabled = true;

                }, 1000);
            }
        }
    }

    moveForceDroitePetit() {

        if (!this.overideHautPetit) {


            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();
            this.cursors.enabled = false;
            this.courantActif = true
            this.player.setVelocityX(700)

            setTimeout(() => {
                this.courantActif = false
                this.player.setVelocityX(0)
                this.cursors.enabled = true;

            }, 300);

        }
    }
    moveForceGauche() {

        if (!this.overideHautPetit) {
            this.overideCote = true
            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();
            this.cursors.enabled = false;
            this.courantActif = true
            this.player.setVelocityX(-700)

            setTimeout(() => {
                this.courantActif = false
                this.player.setVelocityX(0)
                this.cursors.enabled = true;
                this.overideCote = false

            }, 700);
        }

    }

    moveForceGauchePetit() {

        if (!this.overideHautPetit) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();
            this.cursors.enabled = false;
            this.courantActif = true
            this.player.setVelocityX(-700)

            setTimeout(() => {
                this.courantActif = false
                this.player.setVelocityX(0)
                this.cursors.enabled = true;

            }, 300);
        }

    }
    moveForceHaut() {

        if (!this.overideHautPetit) {
            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();
            this.cursors.enabled = false;
            this.courantActif = true
            this.player.setVelocityY(-700)

            setTimeout(() => {
                this.courantActif = false
                this.player.setVelocityY(0)
                this.cursors.enabled = true;

            }, 1200);

        }
    }
    moveForceHautPetit() {

        this.overideHautPetit = true
        this.player.setVelocityX(0)
        this.player.setVelocityY(0)
        this.cursors.right.reset();
        this.cursors.left.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
        this.cursors.enabled = false;
        this.courantActif = true
        this.player.setVelocityY(-700)

        setTimeout(() => {
            this.courantActif = false
            this.player.setVelocityY(0)
            this.cursors.enabled = true;
            this.overideHautPetit = false

        }, 350);


    }
    moveForceBas() {

        if (!this.overideHautPetit) {

            this.player.setVelocityX(0)
            this.player.setVelocityY(0)
            this.cursors.right.reset();
            this.cursors.left.reset();
            this.cursors.up.reset();
            this.cursors.down.reset();
            this.cursors.enabled = false;
            this.courantActif = true
            this.player.setVelocityY(700)

            setTimeout(() => {
                this.courantActif = false
                this.player.setVelocityY(0)
                this.cursors.enabled = true;

            }, 1000);

        }
    }
    moveForceBasPetit() {


        this.player.setVelocityX(0)
        this.player.setVelocityY(0)
        this.cursors.right.reset();
        this.cursors.left.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
        this.cursors.enabled = false;
        this.courantActif = true
        this.player.setVelocityY(1000)

        setTimeout(() => {
            this.courantActif = false
            this.player.setVelocityY(0)
            this.cursors.enabled = true;

        }, 350);


    }

    playerHitR(player) {
        if (!this.degatsPris) {
            this.degatsPris = true;
            player.setTint(0xff0000);
            this.vieActuelle = this.vieActuelle - 1
            player.scene.cameras.main.shake(500, 0.005);


            setTimeout(() => {
                this.degatsPris = false;
                player.setTint();

            }, 350);
        }

    }


    playerFrappeR(player, requin) {
        this.value = Phaser.Math.Between(0, 10);

        if (this.value <= 5) {
            requin.perle.x = requin.x
            requin.perle.y = requin.y
        }

        if ((this.value >= 6) && (this.value <= 8)) {
            requin.soin.x = requin.x
            requin.soin.y = requin.y

        }
        requin.vivant = false

        requin.destroy();

    }


    playerPerle(player, perle) {

        perle.x = 0
        perle.y = 15000
        this.counterPerle++


    }

    playerSoin(player, soin) {
        soin.x = 0
        soin.y = 15000
        console.log(this.vieActuelle)
        if (this.vieMax == 2) {
            if (this.vieActuelle < 2) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 4) {
            if (this.vieActuelle < 4) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 6) {
            if (this.vieActuelle < 6) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 8) {
            if (this.vieActuelle < 8) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
        else if (this.vieMax == 10) {
            if (this.vieActuelle < 10) {
                this.vieActuelle = this.vieActuelle + 1
            }
        }
    }

    playerTrouveGun(player, gun) {
        this.powerup3 = true;
        gun.destroy()
    }


    playerVieUp(player, boost) {
        boost.x = 0
        boost.y = 15000
        console.log(this.vieActuelle)
        if (this.vieMax < 10) {
            this.vieMax = this.vieMax + 2
            this.vieActuelle = this.vieActuelle + 2
            this.boostViePrise[2] = true

        }

    }

    playerFrappeBoss(player, partieBoss) {

        if (!this.degatsBossPris) {
            this.degatsBossPris = true;
            partieBoss.setTint(0xff0000);

            partieBoss.vie = partieBoss.vie - 1

            setTimeout(() => {
                this.degatsBossPris = false;
                partieBoss.setTint();
                console.log(partieBoss.vie)
            }, 1000);
        }

    }
    
    playerFrappeBossT1() {

        if (!this.degatsBossPris) {
            
            this.degatsBossPris = true;
            this.bossD2_Tenta1.setTint(0xff0000);

            this.bossD2_Tenta1.vie =  this.bossD2_Tenta1.vie - 1

            setTimeout(() => {
                this.degatsBossPris = false;
                this.bossD2_Tenta1.setTint();
                console.log( this.bossD2_Tenta1.vie)
            }, 1000);
        }

    }
    playerFrappeBossT2() {

        if (!this.degatsBossPris) {
            this.degatsBossPris = true;

            this.bossD2_Tenta2.vie =  this.bossD2_Tenta2.vie - 1

            setTimeout(() => {
                this.degatsBossPris = false;
            }, 1000);
        }

    }
    playerFrappeBossT3() {

        if (!this.degatsBossPris) {
            this.degatsBossPris = true;

            this.bossD2_Tenta3.vie =  this.bossD2_Tenta3.vie - 1

            setTimeout(() => {
                this.degatsBossPris = false;
            }, 1000);
        }

    }
    playerFrappeBossT4() {

        if (!this.degatsBossPris) {
            this.degatsBossPris = true;

            this.bossD2_Tenta4.vie =  this.bossD2_Tenta4.vie - 1

            setTimeout(() => {
                this.degatsBossPris = false;
            }, 1000);
        }

    }

    bougeLevier(player,levier){
        levier.levierActif=true
    }



}