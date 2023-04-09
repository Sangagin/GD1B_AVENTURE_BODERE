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


        this.load.image("gun", "assets/anims/pistolet_crevette.png");
        this.load.image("bulles", "assets/anims/bulles.png");
        this.load.image("requin", "assets/sprites/Sprite_enemmi_01.png");
        this.load.image("soin", "assets/sprites/Sprite_coeur_soin.png");
        this.load.image("perle", "assets/sprites/Sprite_perle.png");
        this.load.image("pinceARamass", "assets/sprites/icone_crabe.png");



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





        this.player = this.physics.add.sprite(900, 950, 'perso');




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

        this.player.x = 1150


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

        //creation courants

        {
            //salle 1
            this.courant3 = this.physics.add.sprite(3555, 5248, 'courrant3_1');
            this.courant4 = this.physics.add.sprite(3615, 5248, 'courrant3_1');
            this.courant5 = this.physics.add.sprite(3680, 5248, 'courrant3_1');
            this.courant3.setAngle(180)
            this.courant4.setAngle(180)
            this.courant5.setAngle(180)
            this.courant6 = this.physics.add.sprite(4444, 5540, 'courrant3_1');
            this.courant7 = this.physics.add.sprite(4444 + 64, 5540, 'courrant3_1');
            this.courant8 = this.physics.add.sprite(4444 + 64 + 64, 5540, 'courrant3_1');
            this.courant6.setAngle(180)
            this.courant7.setAngle(180)
            this.courant8.setAngle(180)

            //salle 2
            this.courant9 = this.physics.add.sprite(4000, 3300, 'courrant3');
            this.courant9.flipX = true
            this.courant10 = this.physics.add.sprite(4000, 4000, 'courrant3');
            this.courant10.flipX = true
            this.courant11 = this.physics.add.sprite(4000, 3300 + 64, 'courrant3');
            this.courant11.flipX = true
            this.courant12 = this.physics.add.sprite(4000, 4000 - 64, 'courrant3');
            this.courant12.flipX = true
            this.courant13 = this.physics.add.sprite(4000, 3300 + 64 + 64, 'courrant3');
            this.courant13.flipX = true
            this.courant14 = this.physics.add.sprite(4000, 4000 - 64 - 64, 'courrant3');
            this.courant14.flipX = true
            this.courant15 = this.physics.add.sprite(4000 + 64 * 6, 4000, 'courrant3');
            this.courant16 = this.physics.add.sprite(4000 + 64 * 6, 4000 - 64, 'courrant3');
            this.courant17 = this.physics.add.sprite(4000 + 64 * 6, 4000 - 64 - 64, 'courrant3');
            this.courant18 = this.physics.add.sprite(3870 + 64, 3450 + 70, 'courrant2_1');
            this.courant19 = this.physics.add.sprite(3870 + 64 + 64, 3450 + 70, 'courrant2_1');
            this.courant20 = this.physics.add.sprite(3870 + 64, 3450 + 70 + 64 * 4, 'courrant2_1');
            this.courant20.flipY = true
            this.courant21 = this.physics.add.sprite(3870 + 64 + 64, 3450 + 70 + 64 * 4, 'courrant2_1');
            this.courant21.flipY = true
            this.courant22 = this.physics.add.sprite(3870 + 64 + 64 + 64, 3450 + 70 + 64 * 4, 'courrant2_1');
            this.courant23 = this.physics.add.sprite(3870 + 64 + 64 + 128, 3450 + 70 + 64 * 4, 'courrant2_1');
            this.courant24 = this.physics.add.sprite(3870 + 64 + 64 + 128 + 64, 3450 + 70 + 64 * 4, 'courrant2_1');
            this.courant25 = this.physics.add.sprite(3870 + 64 + 64 + 128 + 64 + 64, 3450 + 70 + 64 * 4, 'courrant2_1');
            this.courant26 = this.physics.add.sprite(4000 + 64 * 6, 3300, 'courrant3');
            this.courant26.flipX = true
            this.courant28 = this.physics.add.sprite(4000 + 64 * 6, 3300 + 64, 'courrant3');
            this.courant28.flipX = true
            this.courant29 = this.physics.add.sprite(3870 + 64 + 64 + 128 + 64 + 64 + 64, 3450 + 70 + 64 * 3, 'courrant3_1');
            this.courant29.flipY = true
            this.courant30 = this.physics.add.sprite(3870 + 64 + 64 + 128 + 64 + 64 + 64 * 2, 3450 + 70 + 64 * 3, 'courrant3_1');
            this.courant30.flipY = true
            this.courant31 = this.physics.add.sprite(3870 + 64 + 64 + 128 + 64 + 64 + 64 * 3, 3450 + 70 + 64 * 3, 'courrant3_1');
            this.courant31.flipY = true
            this.courant33 = this.physics.add.sprite(3870 + 64 + 64 * 2, 3450 + 70, 'courrant2_1');
            this.courant33.flipY = true
            this.courant34 = this.physics.add.sprite(3870 + 64 + 64 * 3, 3450 + 70, 'courrant2_1');
            this.courant34.flipY = true
            this.courant35 = this.physics.add.sprite(3870 + 64 + 64 * 4, 3450 + 70, 'courrant2_1');
            this.courant35.flipY = true
            this.courant36 = this.physics.add.sprite(3870 + 64 + 64 * 5, 3450 + 70, 'courrant2_1');
            this.courant36.flipY = true
            this.courant37 = this.physics.add.sprite(3870 + 64 + 64 * 6, 3450 + 70, 'courrant2_1');
            this.courant37.flipY = true
            this.courant38 = this.physics.add.sprite(3870 + 64 + 64 * 7, 3450 + 70, 'courrant2_1');
            this.courant38.flipY = true
            this.courant39 = this.physics.add.sprite(3870 + 64 + 64 * 8, 3450 + 70, 'courrant2_1');
            this.courant39.flipY = true
            this.courant40 = this.physics.add.sprite(4000 + 64 * 6, 3300 + 64 + 64, 'courrant3');
            this.courant40.flipX = true

            //salle 3
            this.courant41 = this.physics.add.sprite(6435, 7600 - 32, 'courrant3_1');
            this.courant42 = this.physics.add.sprite(6435 - 64, 7600 - 32, 'courrant3_1');
            this.courant43 = this.physics.add.sprite(6435 + 64, 7600 - 32, 'courrant3_1');
            //  this.courant44 = this.physics.add.sprite(6435, 7600 , 'courrant3_1');
            this.courant45 = this.physics.add.sprite(6435 - 64 - 64, 7600 - 32, 'courrant3_1');
            this.courant45.flipY = true
            this.courant46 = this.physics.add.sprite(6435 + 64 + 64, 7600 - 32, 'courrant3_1');
            this.courant46.flipY = true
            this.courant47 = this.physics.add.sprite(6435, 7600 + 32 + 128 * 2, 'courrant2_1');
            this.courant47.flipY = true
            this.courant48 = this.physics.add.sprite(6435 - 64 - 15, 7600 + 128 * 2, 'courrant');
            this.courant48.setAngle(90)
            this.courant49 = this.physics.add.sprite(6435 + 64 + 15, 7600 + 128 * 2, 'courrant');
            this.courant49.setAngle(90)
            this.courant50 = this.physics.add.sprite(6435 - 64 - 32 - 64 - 15, 7600 + 128 * 2 + 64, 'courrant3');
            this.courant50.flipX = true
            this.courant51 = this.physics.add.sprite(6435 + 64 + 32 + 64 + 15, 7600 + 128 * 2 + 64, 'courrant3');
            this.courant52 = this.physics.add.sprite(6435 - 64 - 32 - 64 - 64, 7600 + 128 * 2 + 64 + 64 + 20, 'courrant3');
            this.courant53 = this.physics.add.sprite(6435 + 64 + 32 + 64 + 64, 7600 + 128 * 2 + 64 + 64 + 20, 'courrant3');
            this.courant53.flipX = true
            this.courant54 = this.physics.add.sprite(6435 - 64 - 5 - 64 * 4 - 15, 7600 + 128 * 2 + 64, 'courrant');
            this.courant54.setAngle(90)
            this.courant55 = this.physics.add.sprite(6435 + 64 + 5 + 64 * 4 + 15, 7600 + 128 * 2 + 64, 'courrant');
            this.courant55.setAngle(90)
            this.courant56 = this.physics.add.sprite(6435 - 64 - 64 - 64 - 32, 7600 + 128, 'courrant2');
            this.courant56.flipX = true
            this.courant57 = this.physics.add.sprite(6435 + 64 + 32 + 64 + 64, 7600 + 128, 'courrant2');
            this.courant58 = this.physics.add.sprite(6435 - 64 - 32 - 64 - 64 - 32, 7600 + 128 + 64 + 10, 'courrant3');
            this.courant58.flipX = true
            this.courant59 = this.physics.add.sprite(6435 + 64 + 32 + 64 + 64 + 32, 7600 + 128 + 64 + 10, 'courrant3');
            this.courant60 = this.physics.add.sprite(6435 - 64 - 64 * 4 - 25, 7600, 'courrant3_1');
            this.courant60.flipY = true
            this.courant61 = this.physics.add.sprite(6435 + 64 + 64 * 4 + 25, 7600, 'courrant3_1');
            this.courant61.flipY = true
            this.courant62 = this.physics.add.sprite(6435 - 64 - 32 - 64 - 10 - 64 - 64 - 10, 7300 + 32 - 10, 'courrant3');
            this.courant63 = this.physics.add.sprite(6435 + 64 + 32 + 64 + 10 + 64 + 64 + 10, 7300 + 32 - 10, 'courrant3');
            this.courant63.flipX = true
            this.courant64 = this.physics.add.sprite(6435 - 64 - 32 - 64 - 10 - 64 - 64 - 10, 7364 + 32, 'courrant3');
            this.courant65 = this.physics.add.sprite(6435 + 64 + 32 + 64 + 20 + 64 - 10 + 64, 7364 + 32, 'courrant3');
            this.courant65.flipX = true

            //fonction sens poussée
            this.physics.add.overlap(this.player, this.courant1, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant2, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant3, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant4, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant5, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant6, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant7, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant8, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant9, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant10, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant11, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant12, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant13, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant14, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant15, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant16, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant17, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant18, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant19, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant20, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant21, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant22, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant23, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant24, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant25, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant26, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant28, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant29, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant30, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant31, this.moveForceHaut, null, this);

            this.physics.add.overlap(this.player, this.courant33, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant34, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant35, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant36, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant37, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant38, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant39, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant40, this.moveForceGauche, null, this);

            this.physics.add.overlap(this.player, this.courant41, this.moveForceBasPetit, null, this);
            this.physics.add.overlap(this.player, this.courant42, this.moveForceBasPetit, null, this);
            this.physics.add.overlap(this.player, this.courant43, this.moveForceBasPetit, null, this);
            this.physics.add.overlap(this.player, this.courant45, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant46, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant47, this.moveForceHautPetit, null, this);
            this.physics.add.overlap(this.player, this.courant48, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant49, this.moveForceBas, null, this);
            this.physics.add.overlap(this.player, this.courant50, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant51, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant52, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant53, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant54, this.moveForceBasPetit, null, this);
            this.physics.add.overlap(this.player, this.courant55, this.moveForceBasPetit, null, this);
            this.physics.add.overlap(this.player, this.courant56, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant57, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant58, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant59, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant60, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant61, this.moveForceHaut, null, this);
            this.physics.add.overlap(this.player, this.courant62, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant63, this.moveForceGauche, null, this);
            this.physics.add.overlap(this.player, this.courant64, this.moveForceDroite, null, this);
            this.physics.add.overlap(this.player, this.courant65, this.moveForceGauche, null, this);

        }

        this.overideHautPetit = false
        this.overideCote = false
        //creation ennemis
        {
            {
                this.requinD1_0 = this.physics.add.sprite(3680, 425, 'requin');
                this.requinD1_0.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_0, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_0, this.playerFrappeR, null, this);
                this.perleD1_0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_0, this.playerPerle, null, this);
                this.soinD1_0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_0, this.playerSoin, null, this);
                this.requinD1_0.perle = this.perleD1_0;
                this.requinD1_0.soin = this.soinD1_0;
            }

            {
                this.requinD1_1 = this.physics.add.sprite(3680, 1120, 'requin');
                this.requinD1_1.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_1, this.playerFrappeR, null, this);
                this.perleD1_1 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_1, this.playerPerle, null, this);
                this.soinD1_1 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_1, this.playerSoin, null, this);
                this.requinD1_1.perle = this.perleD1_1;
                this.requinD1_1.soin = this.soinD1_1;
            }

            {
                this.requinD1_3 = this.physics.add.sprite(4125, 760, 'requin');
                this.requinD1_3.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_3, this.playerFrappeR, null, this);
                this.perleD1_3 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_3, this.playerPerle, null, this);
                this.soinD1_3 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_3, this.playerSoin, null, this);
                this.requinD1_3.perle = this.perleD1_3;
                this.requinD1_3.soin = this.soinD1_3;
            }
            {
                this.requinD1_4 = this.physics.add.sprite(4125, 760, 'requin');
                this.requinD1_4.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_4, this.playerFrappeR, null, this);
                this.perleD1_4 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_4, this.playerPerle, null, this);
                this.soinD1_4 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_4, this.playerSoin, null, this);
                this.requinD1_4.perle = this.perleD1_4;
                this.requinD1_4.soin = this.soinD1_4;
            }
            {
                this.requinD1_5 = this.physics.add.sprite(4125, 760, 'requin');
                this.requinD1_5.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_5, this.playerFrappeR, null, this);
                this.perleD1_5 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_5, this.playerPerle, null, this);
                this.soinD1_5 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_5, this.playerSoin, null, this);
                this.requinD1_5.perle = this.perleD1_5;
                this.requinD1_5.soin = this.soinD1_5;
            }
            {
                this.requinD1_6 = this.physics.add.sprite(4125, 760, 'requin');
                this.requinD1_6.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_6, this.playerFrappeR, null, this);
                this.perleD1_6 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_6, this.playerPerle, null, this);
                this.soinD1_6 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_6, this.playerSoin, null, this);
                this.requinD1_6.perle = this.perleD1_6;
                this.requinD1_6.soin = this.soinD1_6;
            }

            {
                this.requinD1_7 = this.physics.add.sprite(3680, 425, 'requin');
                this.requinD1_7.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_7, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_7, this.playerFrappeR, null, this);
                this.perleD1_7 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_7, this.playerPerle, null, this);
                this.soinD1_7 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_7, this.playerSoin, null, this);
                this.requinD1_7.perle = this.perleD1_7;
                this.requinD1_7.soin = this.soinD1_7;
            }
            {
                this.requinD1_8 = this.physics.add.sprite(3680, 425, 'requin');
                this.requinD1_8.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_8, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_8, this.playerFrappeR, null, this);
                this.perleD1_8 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_8, this.playerPerle, null, this);
                this.soinD1_8 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_8, this.playerSoin, null, this);
                this.requinD1_8.perle = this.perleD1_8;
                this.requinD1_8.soin = this.soinD1_8;
            }
            {
                this.requinD1_9 = this.physics.add.sprite(3680, 425, 'requin');
                this.requinD1_9.body.immovable = true;
                this.physics.add.collider(this.player, this.requinD1_9, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinD1_9, this.playerFrappeR, null, this);
                this.perleD1_9 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_9, this.playerPerle, null, this);
                this.soinD1_9 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_9, this.playerSoin, null, this);
                this.requinD1_9.perle = this.perleD1_9;
                this.requinD1_9.soin = this.soinD1_9;
            }
            //bullots
            {
                this.bullotD1_0 = this.physics.add.sprite(6340, 900, 'bullot');
                this.bullotD1_0.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_0, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_0, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_0, this.playerFrappeRate, null, this);
                this.perleD1_B0 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B0, this.playerPerle, null, this);
                this.soinD1_B0 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B0, this.playerSoin, null, this);
                this.bullotD1_0.perle = this.perleD1_B0;
                this.bullotD1_0.soin = this.soinD1_B0;
                this.bullotD1_0.setScale(1.5)
            }
            {
                this.bullotD1_1 = this.physics.add.sprite(6785, 900, 'bullot');
                this.bullotD1_1.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_1, this.playerFrappeRate, null, this);
                this.perleD1_B1 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B1, this.playerPerle, null, this);
                this.soinD1_B1 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B1, this.playerSoin, null, this);
                this.bullotD1_1.perle = this.perleD1_B1;
                this.bullotD1_1.soin = this.soinD1_B1;
                this.bullotD1_1.setScale(1.5)
            }
            {
                this.bullotD1_2 = this.physics.add.sprite(6340, 640, 'bullot');
                this.bullotD1_2.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_2, this.playerFrappeRate, null, this);
                this.perleD1_B2 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B2, this.playerPerle, null, this);
                this.soinD1_B2 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B2, this.playerSoin, null, this);
                this.bullotD1_2.perle = this.perleD1_B2;
                this.bullotD1_2.soin = this.soinD1_B2;
                this.bullotD1_2.setScale(1.5)
            }
            {
                this.bullotD1_3 = this.physics.add.sprite(6340, 512, 'bullot');
                this.bullotD1_3.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_3, this.playerFrappeRate, null, this);
                this.perleD1_B3 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B3, this.playerPerle, null, this);
                this.soinD1_B3 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B3, this.playerSoin, null, this);
                this.bullotD1_3.perle = this.perleD1_B3;
                this.bullotD1_3.soin = this.soinD1_B3;
                this.bullotD1_3.setScale(1.5)
            }
            {
                this.bullotD1_4 = this.physics.add.sprite(6453, 385, 'bullot');
                this.bullotD1_4.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_4, this.playerFrappeRate, null, this);
                this.perleD1_B4 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B4, this.playerPerle, null, this);
                this.soinD1_B4 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B4, this.playerSoin, null, this);
                this.bullotD1_4.perle = this.perleD1_B4;
                this.bullotD1_4.soin = this.soinD1_B4;
                this.bullotD1_4.setScale(1.5)
            }
            {
                this.bullotD1_5 = this.physics.add.sprite(6560, 385, 'bullot');
                this.bullotD1_5.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_5, this.playerFrappeRate, null, this);
                this.perleD1_B5 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B5, this.playerPerle, null, this);
                this.soinD1_B5 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B5, this.playerSoin, null, this);
                this.bullotD1_5.perle = this.perleD1_B5;
                this.bullotD1_5.soin = this.soinD1_B5;
                this.bullotD1_5.setScale(1.5)
            }
            {
                this.bullotD1_6 = this.physics.add.sprite(6666, 385, 'bullot');
                this.bullotD1_6.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_6, this.playerFrappeRate, null, this);
                this.perleD1_B6 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B6, this.playerPerle, null, this);
                this.soinD1_B6 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B6, this.playerSoin, null, this);
                this.bullotD1_6.perle = this.perleD1_B6;
                this.bullotD1_6.soin = this.soinD1_B6;
                this.bullotD1_6.setScale(1.5)
            }
            {
                this.bullotD1_7 = this.physics.add.sprite(4060, 5380, 'bullot');
                this.bullotD1_7.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_7, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_7, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_7, this.playerFrappeRate, null, this);
                this.perleD1_B7 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B7, this.playerPerle, null, this);
                this.soinD1_B7 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B7, this.playerSoin, null, this);
                this.bullotD1_7.perle = this.perleD1_B7;
                this.bullotD1_7.soin = this.soinD1_B7;
                this.bullotD1_7.setScale(1.7)
            }
            {
                this.bullotD1_8 = this.physics.add.sprite(6400, 3550, 'bullot');
                this.bullotD1_8.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_8, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_8, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_8, this.playerFrappeRate, null, this);
                this.perleD1_B8 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B8, this.playerPerle, null, this);
                this.soinD1_B8 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B8, this.playerSoin, null, this);
                this.bullotD1_8.perle = this.perleD1_B8;
                this.bullotD1_8.soin = this.soinD1_B8;
                this.bullotD1_8.setScale(1.5)
            }
            {
                this.bullotD1_9 = this.physics.add.sprite(6550, 3550, 'bullot');
                this.bullotD1_9.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_9, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_9, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_9, this.playerFrappeRate, null, this);
                this.perleD1_B9 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B9, this.playerPerle, null, this);
                this.soinD1_B9 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B9, this.playerSoin, null, this);
                this.bullotD1_9.perle = this.perleD1_B9;
                this.bullotD1_9.soin = this.soinD1_B9;
                this.bullotD1_9.setScale(1.5)
            }
            {
                this.bullotD1_10 = this.physics.add.sprite(6700, 3550, 'bullot');
                this.bullotD1_10.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_10, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_10, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_10, this.playerFrappeRate, null, this);
                this.perleD1_B10 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B10, this.playerPerle, null, this);
                this.soinD1_B10 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B10, this.playerSoin, null, this);
                this.bullotD1_10.perle = this.perleD1_B10;
                this.bullotD1_10.soin = this.soinD1_B10;
                this.bullotD1_10.setScale(1.5)
            }
            {
                this.bullotD1_11 = this.physics.add.sprite(6850, 3550, 'bullot');
                this.bullotD1_11.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_11, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_11, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_11, this.playerFrappeRate, null, this);
                this.perleD1_B11 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B11, this.playerPerle, null, this);
                this.soinD1_B11 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B11, this.playerSoin, null, this);
                this.bullotD1_11.perle = this.perleD1_B11;
                this.bullotD1_11.soin = this.soinD1_B11;
                this.bullotD1_11.setScale(1.5)
            }
            {
                this.bullotD1_12 = this.physics.add.sprite(6850, 3430, 'bullot');
                this.bullotD1_12.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_12, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_12, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_12, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_12, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_12, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_12, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_12, this.playerFrappeRate, null, this);
                this.perleD1_B12 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B12, this.playerPerle, null, this);
                this.soinD1_B12 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B12, this.playerSoin, null, this);
                this.bullotD1_12.perle = this.perleD1_B12;
                this.bullotD1_12.soin = this.soinD1_B12;
                this.bullotD1_12.setScale(1.5)
            }
            {
                this.bullotD1_13 = this.physics.add.sprite(6850, 3310, 'bullot');
                this.bullotD1_13.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_13, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_13, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_13, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_13, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_13, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_13, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_13, this.playerFrappeRate, null, this);
                this.perleD1_B13 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B13, this.playerPerle, null, this);
                this.soinD1_B13 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B13, this.playerSoin, null, this);
                this.bullotD1_13.perle = this.perleD1_B13;
                this.bullotD1_13.soin = this.soinD1_B13;
                this.bullotD1_13.setScale(1.5)
            }

            {
                this.bullotD1_14 = this.physics.add.sprite(4050, 7300, 'bullot');
                this.bullotD1_14.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_14, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_14, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_14, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_14, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_14, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_14, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_14, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_14, this.playerFrappeRate, null, this);
                this.perleD1_B14 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B14, this.playerPerle, null, this);
                this.soinD1_B14 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B14, this.playerSoin, null, this);
                this.bullotD1_14.perle = this.perleD1_B14;
                this.bullotD1_14.soin = this.soinD1_B14;
                this.bullotD1_14.setScale(1.5)
            }

            {
                this.bullotD1_15 = this.physics.add.sprite(3800, 7500, 'bullot');
                this.bullotD1_15.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_15, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_15, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_15, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_15, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_15, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_15, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_15, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_15, this.playerFrappeRate, null, this);
                this.perleD1_B15 = this.physics.add.sprite(0, 9000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B15, this.playerPerle, null, this);
                this.soinD1_B15 = this.physics.add.sprite(0, 9000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B15, this.playerSoin, null, this);
                this.bullotD1_15.perle = this.perleD1_B15;
                this.bullotD1_15.soin = this.soinD1_B15;
                this.bullotD1_15.setScale(1.5)
            }

            {
                this.bullotD1_16 = this.physics.add.sprite(4348, 7400, 'bullot');
                this.bullotD1_16.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_16, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_16, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_16, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_16, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_16, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_16, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_16, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_16, this.playerFrappeRate, null, this);
                this.perleD1_B16 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B16, this.playerPerle, null, this);
                this.soinD1_B16 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B16, this.playerSoin, null, this);
                this.bullotD1_16.perle = this.perleD1_B16;
                this.bullotD1_16.soin = this.soinD1_B16;
                this.bullotD1_16.setScale(1.5)
            }

            {
                this.bullotD1_17 = this.physics.add.sprite(3810, 7070, 'bullot');
                this.bullotD1_17.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotD1_17, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotD1_17, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotD1_17, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotD1_17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotD1_17, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotD1_17, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotD1_17, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotD1_17, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotD1_17, this.playerFrappeRate, null, this);
                this.perleD1_B17 = this.physics.add.sprite(0, 15000, 'perle');
                this.physics.add.collider(this.player, this.perleD1_B17, this.playerPerle, null, this);
                this.soinD1_B17 = this.physics.add.sprite(0, 15000, 'soin');
                this.physics.add.collider(this.player, this.soinD1_B17, this.playerSoin, null, this);
                this.bullotD1_17.perle = this.perleD1_B17;
                this.bullotD1_17.soin = this.soinD1_B17;
                this.bullotD1_17.setScale(1.5)
            }

        }

        //creation boss






        //soin naturels

        this.soinD1_L0 = this.physics.add.sprite(2000, 5000, 'soin');
        this.physics.add.collider(this.player, this.soinD1_L0, this.playerSoin, null, this);
        this.soinD1_L1 = this.physics.add.sprite(2000, 5250, 'soin');
        this.physics.add.collider(this.player, this.soinD1_L1, this.playerSoin, null, this);
        this.soinD1_L2 = this.physics.add.sprite(1720, 5440, 'soin');
        this.physics.add.collider(this.player, this.soinD1_L2, this.playerSoin, null, this);

        if (this.boostViePrise[2] == false) {
            this.soinA_L1 = this.physics.add.sprite(8730, 5060, 'boost');
            this.physics.add.collider(this.player, this.soinA_L1, this.playerVieUp, null, this);
        }

        //perles naturelles
        this.perleD1_L0 = this.physics.add.sprite(1200, 6850, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L0, this.playerPerle, null, this);
        this.perleD1_L1 = this.physics.add.sprite(1200, 7100, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L1, this.playerPerle, null, this);
        this.perleD1_L2 = this.physics.add.sprite(1200, 7100 + 250, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L2, this.playerPerle, null, this);
        this.perleD1_L3 = this.physics.add.sprite(1200 + 400, 7100, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L3, this.playerPerle, null, this);
        this.perleD1_L4 = this.physics.add.sprite(1200 + 200, 6850, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L4, this.playerPerle, null, this);
        this.perleD1_L5 = this.physics.add.sprite(1200 + 200, 7100, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L5, this.playerPerle, null, this);
        this.perleD1_L6 = this.physics.add.sprite(1200 + 200, 7100 + 250, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L6, this.playerPerle, null, this);
        this.perleD1_L7 = this.physics.add.sprite(1200 + 200 + 200, 6850, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L7, this.playerPerle, null, this);
        this.perleD1_L8 = this.physics.add.sprite(1200 + 200 + 200, 7350, 'perle');
        this.physics.add.collider(this.player, this.perleD1_L8, this.playerPerle, null, this);

        //display powerup a rammasser
        //boite message d'indic a faire
        this.pincePowerUp = this.physics.add.sprite(6420, 3740, 'pinceARamass');
        this.physics.add.collider(this.player, this.pincePowerUp, this.playerTrouvePince, null, this);



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

        }


        this.graphics = this.add.graphics();

        //path des requins
        this.pathD1_0 = new Phaser.Curves.Path(3680, 760);
        this.pathD1_0.splineTo([4550, 760]);
        this.followD1_0 = this.add.follower(this.pathD1_0, 3680, 420);
        this.followD1_0.setScale(0.1);
        this.followD1_0.startFollow({
            duration: 5000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followD1_1 = this.add.follower(this.pathD1_0, 3680, 1120);
        this.followD1_1.setScale(0.1);
        this.followD1_1.startFollow({
            duration: 5000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });



        this.pathD1_1 = new Phaser.Curves.Path(1220, 3200);
        this.pathD1_1.splineTo([1373, 3770, 1500, 3200, 1800, 3770, 2100, 3200]);
        this.followD1_2 = this.add.follower(this.pathD1_1, 1220, 3200);
        this.followD1_2.setScale(0.1);
        this.followD1_2.startFollow({
            duration: 6000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.pathD1_3 = new Phaser.Curves.Path(1220, 3770);
        this.pathD1_3.splineTo([1373, 3200, 1500, 3770, 1800, 3200, 2100, 3770]);
        this.followD1_3 = this.add.follower(this.pathD1_3, 1220, 3770);
        this.followD1_3.setScale(0.1);
        this.followD1_3.startFollow({
            duration: 6000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });

        this.pathD1_4 = new Phaser.Curves.Path(1220, 3200);
        this.pathD1_4.splineTo([1640, 2900, 2100, 3200, 1640, 3500, 1220, 2900]);
        this.followD1_4 = this.add.follower(this.pathD1_4, 1220, 3200);
        this.followD1_4.setScale(0.1);
        this.followD1_4.startFollow({
            duration: 6000,
            yoyo: true,

            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });


        this.pathD1_5 = new Phaser.Curves.Path(3650, 7050);
        this.pathD1_5.splineTo([3840, 7300, 3650, 7600, 4514, 7600, 4238, 7300, 4514, 7050]);
        this.followD1_5 = this.add.follower(this.pathD1_5, 3650, 7050);
        this.followD1_5.setScale(0.1);
        this.followD1_5.startFollow({
            duration: 6000,

            repeat: -1,
            yoyo: true,
            rotateToPath: true,
            verticalAdjust: true
        });

        this.pathD1_6 = new Phaser.Curves.Path(4050, 7500);
        this.pathD1_6.splineTo([4270, 7300, 4050, 7050, 3800, 7300, 4050, 7500]);
        this.followD1_6 = this.add.follower(this.pathD1_6, 4050, 7500);
        this.followD1_6.setScale(0.1);
        this.followD1_6.startFollow({
            duration: 6000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.pathD1_7 = new Phaser.Curves.Path(3566 - 400 - 500, 7600);
        this.pathD1_7.splineTo([4030 - 900, 6972, 4550 - 900, 7600]);
        this.followD1_7 = this.add.follower(this.pathD1_7, 3566 - 400 - 500, 7600);
        this.followD1_7.setScale(0.1);
        this.followD1_7.startFollow({
            duration: 6000,
            repeat: -1,
            yoyo: true,

            rotateToPath: true,
            verticalAdjust: true
        });


        this.graphics.lineStyle(2, 0xffffff, 1);
        //  this.pathD1_0.draw(this.graphics);


    }


    update() {

        //update de l'UI si powerup

        //update du compteur de perles
        this.comptPerle.setText(this.counterPerle)


        //anims des courants
        {

            this.courant3.anims.play('courrant3_1', true);
            this.courant4.anims.play('courrant3_1', true);
            this.courant5.anims.play('courrant3_1', true);
            this.courant6.anims.play('courrant3_1', true);
            this.courant7.anims.play('courrant3_1', true);
            this.courant8.anims.play('courrant3_1', true);
            this.courant9.anims.play('courrant3', true);
            this.courant10.anims.play('courrant3', true);
            this.courant11.anims.play('courrant3', true);
            this.courant12.anims.play('courrant3', true);
            this.courant13.anims.play('courrant3', true);
            this.courant14.anims.play('courrant3', true);
            this.courant15.anims.play('courrant3', true);
            this.courant16.anims.play('courrant3', true);
            this.courant17.anims.play('courrant3', true);
            this.courant18.anims.play('courrant2_1', true);
            this.courant19.anims.play('courrant2_1', true);
            this.courant20.anims.play('courrant2_1', true);
            this.courant21.anims.play('courrant2_1', true);
            this.courant22.anims.play('courrant2_1', true);
            this.courant23.anims.play('courrant2_1', true);
            this.courant24.anims.play('courrant2_1', true);
            this.courant25.anims.play('courrant2_1', true);
            this.courant26.anims.play('courrant3', true);
            this.courant28.anims.play('courrant3', true);
            this.courant29.anims.play('courrant3_1', true);
            this.courant30.anims.play('courrant3_1', true);
            this.courant31.anims.play('courrant3_1', true);
            this.courant33.anims.play('courrant2_1', true);
            this.courant34.anims.play('courrant2_1', true);
            this.courant35.anims.play('courrant2_1', true);
            this.courant36.anims.play('courrant2_1', true);
            this.courant37.anims.play('courrant2_1', true);
            this.courant38.anims.play('courrant2_1', true);
            this.courant39.anims.play('courrant2_1', true);
            this.courant40.anims.play('courrant3', true);
            this.courant41.anims.play('courrant3_1', true);
            this.courant42.anims.play('courrant3_1', true);
            this.courant43.anims.play('courrant3_1', true);
            this.courant45.anims.play('courrant3_1', true);
            this.courant46.anims.play('courrant3_1', true);
            this.courant47.anims.play('courrant2_1', true);
            this.courant48.anims.play('courrant1', true);
            this.courant49.anims.play('courrant1', true);
            this.courant50.anims.play('courrant3', true);
            this.courant51.anims.play('courrant3', true);
            this.courant52.anims.play('courrant3', true);
            this.courant53.anims.play('courrant3', true);
            this.courant54.anims.play('courrant1', true);
            this.courant55.anims.play('courrant1', true);
            this.courant56.anims.play('courrant2', true);
            this.courant57.anims.play('courrant2', true);
            this.courant58.anims.play('courrant3', true);
            this.courant59.anims.play('courrant3', true);
            this.courant60.anims.play('courrant3_1', true);
            this.courant61.anims.play('courrant3_1', true);
            this.courant62.anims.play('courrant3', true);
            this.courant63.anims.play('courrant3', true);
            this.courant64.anims.play('courrant3', true);
            this.courant65.anims.play('courrant3', true);
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
                this.player.x = 1634
                this.player.y = 3128
                this.cameras.main.centerOn(1630, 3460)
                //camera a modifier (salle aussi)
            }



            //elephant a finir !
            //de 4(boss) vers 3
            if ((this.player.x < 1700 && this.player.x > 1550) && (this.player.y < 760 && this.player.y > 540)) {//y pas bon
                this.cameras.main.centerOn(900, 3130)
                this.player.x = 900
                this.player.y = 2300

                this.cameras.main.startFollow(this.player);

                this.ui.x = -120
                this.ui.y = -200
                this.comptPerle.x = -235
                this.comptPerle.y = -125

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


        //mouvement des requins




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

    playerTrouvePince(player, crabe) {
        this.powerup2 = true;
        crabe.destroy()
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



}