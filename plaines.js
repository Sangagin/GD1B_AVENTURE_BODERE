class plaines extends Phaser.Scene {

    constructor() {
        super("plaines");
    }

    init(data) {
        console.log('init', data);
        this.origine=data.origin
        this.powerup2 = data.powerup2;
        this.powerup3 = data.powerup3;
        this.vieActuelle = data.vieA;
        this.vieMax = data.vieM;
        this.counterPerle=data.counterPerle
        this.boss1vaincu=data.boss1
        this.boss2vaincu= data.boss2
        this.boostViePrise= data.tabBoostVie

    }

    preload() {

        this.load.spritesheet('perso', 'assets/sprites/Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 62 });

        this.load.image("tilePlaine", "assets/tileset.png");
        this.load.tilemapTiledJSON("cartePlaines", "assets/maps/map_plaines.json");

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



        this.load.image("gun", "assets/anims/pistolet_crevette.png");
        this.load.image("bulles", "assets/anims/bulles.png");
        this.load.image("requin", "assets/sprites/Sprite_enemmi_01.png");
        this.load.image("soin", "assets/sprites/Sprite_coeur_soin.png");
        this.load.image("boost", "assets/sprites/Sprite_coeur_bonus.png");
        this.load.image("perle", "assets/sprites/Sprite_perle.png");


    }


    create() {

        const carteDuNiveauPlaines = this.add.tilemap("cartePlaines");

        const tilesetPlaine = carteDuNiveauPlaines.addTilesetImage(
            "tilesetPlaceholder",
            "tilePlaine"
        );



        //il s'appelle calque pic mais c'est surtout celui avec la lave
        const calque_sol_plaines = carteDuNiveauPlaines.createLayer(
            "sol",
            tilesetPlaine
        );

        const calque__sous_murs_plaines = carteDuNiveauPlaines.createLayer(
            "sous_mur",
            tilesetPlaine
        );

        const calque_murs_plaines = carteDuNiveauPlaines.createLayer(
            "murs",
            tilesetPlaine
        );

        const calque_cailloux_plaines = carteDuNiveauPlaines.createLayer(
            "cailloux",
            tilesetPlaine
        );




        calque__sous_murs_plaines.setCollisionByProperty({ EstSolide: true });
        calque_murs_plaines.setCollisionByProperty({ EstSolide: true });
        calque_cailloux_plaines.setCollisionByProperty({ EstSolide: true });



        if (this.origine == "village") {


            this.player = this.physics.add.sprite(360, 2900, 'perso');
        }

        else {
            this.player = this.physics.add.sprite(6050, 4960, 'perso');

        }
        this.player.setScale(1.2)
        this.player.setSize(45,45)

        this.origine="plaines"


        this.physics.add.collider(this.player, calque_murs_plaines);
        this.physics.add.collider(this.player, calque__sous_murs_plaines);
        this.physics.add.collider(this.player, calque_cailloux_plaines);


        this.physics.world.setBounds(0, 0, 6400, 6400);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 6400, 6400);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(0.8);



        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastFacingDirection = "right"




        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //affichage UI
        this.ui = this.physics.add.sprite(130, 80, 'UI1');
       // this.ui.setScale(0.8)
        this.ui.depth = 2;
        this.ui.setScrollFactor(0)

        //compteur monnaie
        this.comptPerle = this.add.text(10, 160, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 30 });
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


        //ennemis
        {



            {
                this.requinP0 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP0.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP0, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP0, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP0, this.playerFrappeR, null, this);
                this.perlePR0 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR0, this.playerPerle, null, this);
                this.soinPR0 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR0, this.playerSoin, null, this);
                this.requinP0.perle = this.perlePR0;
                this.requinP0.soin = this.soinPR0;
            }
            {
                this.requinP1 = this.physics.add.sprite(4672, 1000, 'requin');
                this.requinP1.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP1, this.playerFrappeR, null, this);
                this.perlePR1 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR1, this.playerPerle, null, this);
                this.soinPR1 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR1, this.playerSoin, null, this);
                this.requinP1.perle = this.perlePR1;
                this.requinP1.soin = this.soinPR1;
            }
            {
                this.requinP2 = this.physics.add.sprite(4672, 1000, 'requin');
                this.requinP2.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP2, this.playerFrappeR, null, this);
                this.perlePR2 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR2, this.playerPerle, null, this);
                this.soinPR2 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR2, this.playerSoin, null, this);
                this.requinP2.perle = this.perlePR2;
                this.requinP2.soin = this.soinPR2;
            }
            {
                this.requinP3 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP3.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP3, this.playerFrappeR, null, this);
                this.perlePR3 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR3, this.playerPerle, null, this);
                this.soinPR3 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR3, this.playerSoin, null, this);
                this.requinP3.perle = this.perlePR3;
                this.requinP3.soin = this.soinPR3;
            }
            {
                this.requinP4 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP4.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP4, this.playerFrappeR, null, this);
                this.perlePR4 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR4, this.playerPerle, null, this);
                this.soinPR4 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR4, this.playerSoin, null, this);
                this.requinP4.perle = this.perlePR4;
                this.requinP4.soin = this.soinPR4;
            }

            {
                this.requinP5 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP5.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP5, this.playerFrappeR, null, this);
                this.perleP5 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleP5, this.playerPerle, null, this);
                this.soinP5 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinP5, this.playerSoin, null, this);
                this.requinP5.perle = this.perleP5;
                this.requinP5.soin = this.soinP5;
            }

            {
                this.requinP7 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP7.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP7, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP7, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP7, this.playerFrappeR, null, this);
                this.perlePR7 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR7, this.playerPerle, null, this);
                this.soinPR7 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR7, this.playerSoin, null, this);
                this.requinP7.perle = this.perlePR7;
                this.requinP7.soin = this.soinPR7;
            }
            {
                this.requinP8 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP8.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP8, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP8, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP8, this.playerFrappeR, null, this);
                this.perlePR8 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR8, this.playerPerle, null, this);
                this.soinPR8 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR8, this.playerSoin, null, this);
                this.requinP8.perle = this.perlePR8;
                this.requinP8.soin = this.soinPR8;
            }
            {
                this.requinP9 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP9.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP9, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP9, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP9, this.playerFrappeR, null, this);
                this.perlePR9 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR9, this.playerPerle, null, this);
                this.soinPR9 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR9, this.playerSoin, null, this);
                this.requinP9.perle = this.perlePR9;
                this.requinP9.soin = this.soinPR9;
            }
            {
                this.requinP10 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP10.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP10, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP10, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP10, this.playerFrappeR, null, this);
                this.perlePR10 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR10, this.playerPerle, null, this);
                this.soinPR10 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR10, this.playerSoin, null, this);
                this.requinP10.perle = this.perlePR10;
                this.requinP10.soin = this.soinPR10;
            }
            {
                this.requinP6 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP6.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP6, this.playerFrappeR, null, this);
                this.perlePR6 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR6, this.playerPerle, null, this);
                this.soinPR6 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR6, this.playerSoin, null, this);
                this.requinP6.perle = this.perlePR6;
                this.requinP6.soin = this.soinPR6;
            }
            {
                this.requinP11 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP11.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP11, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP11, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP11, this.playerFrappeR, null, this);
                this.perlePR11 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR11, this.playerPerle, null, this);
                this.soinPR11 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR11, this.playerSoin, null, this);
                this.requinP11.perle = this.perlePR11;
                this.requinP11.soin = this.soinPR11;
            }            {
                this.requinP12 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP12.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP12, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP12, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP12, this.playerFrappeR, null, this);
                this.perlePR12 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR12, this.playerPerle, null, this);
                this.soinPR12 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR12, this.playerSoin, null, this);
                this.requinP12.perle = this.perlePR12;
                this.requinP12.soin = this.soinPR12;
            }            {
                this.requinP13 = this.physics.add.sprite(5120, 2240, 'requin');
                this.requinP13.body.immovable = true;
                this.physics.add.collider(this.player, this.requinP13, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.requinP13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.epee2, this.requinP13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince, this.requinP13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.requinP13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.requinP13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles2, this.requinP13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles3, this.requinP13, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles4, this.requinP13, this.playerFrappeR, null, this);
                this.perlePR13 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perlePR13, this.playerPerle, null, this);
                this.soinPR13 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinPR13, this.playerSoin, null, this);
                this.requinP13.perle = this.perlePR13;
                this.requinP13.soin = this.soinPR13;
            }



            {
                this.bullotP1 = this.physics.add.sprite(4200, 2030, 'bullot');
                this.bullotP1.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotP1, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotP1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotP1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotP1, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotP1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotP1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotP1, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotP1, this.playerFrappeRate, null, this);
                this.perleBP1 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleBP1, this.playerPerle, null, this);
                this.soinBP1 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinBP1, this.playerSoin, null, this);
                this.bullotP1.perle = this.perleBP1;
                this.bullotP1.soin = this.soinBP1;
            }
            {
                this.bullotP2 = this.physics.add.sprite(4150, 2100, 'bullot');
                this.bullotP2.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotP2, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotP2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotP2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotP2, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotP2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotP2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotP2, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotP2, this.playerFrappeRate, null, this);
                this.perleBP2 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleBP2, this.playerPerle, null, this);
                this.soinBP2 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinBP2, this.playerSoin, null, this);
                this.bullotP2.perle = this.perleBP2;
                this.bullotP2.soin = this.soinBP2;
            }

            {
                this.bullotP3 = this.physics.add.sprite(4200, 2170, 'bullot');
                this.bullotP3.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotP3, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotP3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotP3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotP3, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotP3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotP3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotP3, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotP3, this.playerFrappeRate, null, this);
                this.perleBP3 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleBP3, this.playerPerle, null, this);
                this.soinBP3 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinBP3, this.playerSoin, null, this);
                this.bullotP3.perle = this.perleBP3;
                this.bullotP3.soin = this.soinBP3;
            }
            {
                this.bullotP4 = this.physics.add.sprite(4280, 2210, 'bullot');
                this.bullotP4.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotP4, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotP4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotP4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotP4, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotP4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotP4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotP4, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotP4, this.playerFrappeRate, null, this);
                this.perleBP4 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleBP4, this.playerPerle, null, this);
                this.soinBP4 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinBP4, this.playerSoin, null, this);
                this.bullotP4.perle = this.perleBP4;
                this.bullotP4.soin = this.soinBP4;
            }
            {
                this.bullotP5 = this.physics.add.sprite(990, 1770, 'bullot');
                this.bullotP5.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotP5, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotP5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotP5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotP5, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotP5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotP5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotP5, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotP5, this.playerFrappeRate, null, this);
                this.perleBP5 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleBP5, this.playerPerle, null, this);
                this.soinBP5 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinBP5, this.playerSoin, null, this);
                this.bullotP5.perle = this.perleBP5;
                this.bullotP5.soin = this.soinBP5;
            }
            {
                this.bullotP6 = this.physics.add.sprite(4600, 4300, 'bullot');
                this.bullotP6.body.immovable = true;
                this.physics.add.collider(this.player, this.bullotP6, this.playerHitR, null, this);
                this.physics.add.overlap(this.epee, this.bullotP6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.epee2, this.bullotP6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.pince, this.bullotP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.pince2, this.bullotP6, this.playerFrappeR, null, this);
                this.physics.add.overlap(this.bulles1, this.bullotP6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles2, this.bullotP6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles3, this.bullotP6, this.playerFrappeRate, null, this);
                this.physics.add.overlap(this.bulles4, this.bullotP6, this.playerFrappeRate, null, this);
                this.perleBP6 = this.physics.add.sprite(0, 6200, 'perle');
                this.physics.add.collider(this.player, this.perleBP6, this.playerPerle, null, this);
                this.soinBP6 = this.physics.add.sprite(0, 6200, 'soin');
                this.physics.add.collider(this.player, this.soinBP6, this.playerSoin, null, this);
                this.bullotP6.perle = this.perleBP6;
                this.bullotP6.soin = this.soinBP6;
            }
        }






//coeurs nat
        this.soinP_L0 = this.physics.add.sprite(3490, 1380, 'soin');
        this.physics.add.collider(this.player, this.soinP_L0, this.playerSoin, null, this);
      
        if(this.boostViePrise[1]==false){

            this.soinP_L1 = this.physics.add.sprite(5660, 1000, 'boost');
            this.physics.add.collider(this.player, this.soinP_L1, this.playerVieUp, null, this);
        }
        this.soinP_L2 = this.physics.add.sprite(1660, 5890, 'soin');
        this.physics.add.collider(this.player, this.soinP_L2, this.playerSoin, null, this);

        //perles nat
        this.perleP_L0 = this.physics.add.sprite(4400, 4325, 'perle');
        this.physics.add.collider(this.player, this.perleP_L0, this.playerPerle, null, this);

        //paths
        this.pathP1 = new Phaser.Curves.Path(4672, 1000);
        this.pathP1.splineTo([5400, 1000]);
        // this.path1.closePath()
        this.followP1 = this.add.follower(this.pathP1, 4672, 1000);
        this.followP1.setScale(0.1);
        this.followP1.startFollow({
            duration: 4000,
            yoyo:true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });


        this.pathP2 = new Phaser.Curves.Path(3240, 420);
        this.pathP2.splineTo([4000, 420]);
        this.followP2 = this.add.follower(this.pathP2, 3240, 420);
        this.followP2.setScale(0.1);
        this.followP2.startFollow({
            duration: 4000,
            yoyo:true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });


        this.pathP3 = new Phaser.Curves.Path(1210, 1450);
        this.pathP3.splineTo([970, 1230,1210,1020,1460,1220,1210,1450]);
        this.followP3 = this.add.follower(this.pathP3, 1210, 1450);
        this.followP3.setScale(0.1);
        this.followP3.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followP4 = this.add.follower(this.pathP3, 1260, 2780);
        this.followP4.setScale(0.1);
        this.followP4.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followP5 = this.add.follower(this.pathP3, 2110, 3410);
        this.followP5.setScale(0.1);
        this.followP5.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followP6 = this.add.follower(this.pathP3, 2240, 2630);
        this.followP6.setScale(0.1);
        this.followP6.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });

        this.followP7 = this.add.follower(this.pathP3, 3060, 2360);
        this.followP7.setScale(0.1);
        this.followP7.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followP8 = this.add.follower(this.pathP3, 3520, 3070);
        this.followP8.setScale(0.1);
        this.followP8.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followP9 = this.add.follower(this.pathP3, 3200, 3830);
        this.followP9.setScale(0.1);
        this.followP9.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });
        this.followP10 = this.add.follower(this.pathP3, 1850, 4100);
        this.followP10.setScale(0.1);
        this.followP10.startFollow({
            duration: 5000,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });

        this.pathP11 = new Phaser.Curves.Path(2644, 2125);
        this.pathP11.splineTo([2650, 4150]);
        // this.path1.closePath()
        this.followP11 = this.add.follower(this.pathP11, 2644, 2125);
        this.followP11.setScale(0.1);
        this.followP11.startFollow({
            duration: 8000,
            yoyo:true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });


        this.pathP12 = new Phaser.Curves.Path(3240, 4230);
        this.pathP12.splineTo([1170, 3320]);
        // this.path1.closePath()
        this.followP12 = this.add.follower(this.pathP12, 3240, 4230);
        this.followP12.setScale(0.1);
        this.followP12.startFollow({
            duration: 10000,
            yoyo:true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });

        this.pathP13 = new Phaser.Curves.Path(1270, 3000);
        this.pathP13.splineTo([3670, 2432]);
        // this.path1.closePath()
        this.followP13 = this.add.follower(this.pathP13, 1270, 3000);
        this.followP13.setScale(0.1);
        this.followP13.startFollow({
            duration: 10000,
            yoyo:true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });


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
                key: 'coura',
                frames: this.anims.generateFrameNumbers('courrant', { start: 0, end: 8 }),
                frameRate: 5,
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




    }


    update() {




        //mouvements de ennemis
        this.requinP0.x = this.followP1.x
        this.requinP0.y = this.followP1.y
        this.requinP1.x = this.followP2.x
        this.requinP1.y = this.followP2.y
        this.requinP2.x = this.followP3.x
        this.requinP2.y = this.followP3.y
        this.requinP4.x = this.followP4.x
        this.requinP4.y = this.followP4.y
        this.requinP5.x = this.followP5.x
        this.requinP5.y = this.followP5.y
        this.requinP6.x = this.followP6.x
        this.requinP6.y = this.followP6.y        
        this.requinP7.x = this.followP7.x
        this.requinP7.y = this.followP7.y
        this.requinP8.x = this.followP8.x
        this.requinP8.y = this.followP8.y        
        this.requinP9.x = this.followP9.x
        this.requinP9.y = this.followP9.y
        this.requinP10.x = this.followP10.x
        this.requinP10.y = this.followP10.y
        this.requinP11.x = this.followP11.x
        this.requinP11.y = this.followP11.y
        this.requinP12.x = this.followP12.x
        this.requinP12.y = this.followP12.y
        this.requinP13.x = this.followP13.x
        this.requinP13.y = this.followP13.y

        this.comptPerle.setText(this.counterPerle)

        //game over
        if (this.vieActuelle <= 0) {
            console.log("change")
            this.scene.start("menu", { etat: true });
        }

//param des changemetns de scene
        if (this.player.x < 100) {
            this.scene.start("village", { origin: this.origine, powerup2: this.powerup2, powerup3: this.powerup3, vieA: this.vieActuelle, vieM: this.vieMax, counterPerle:this.counterPerle,boss1:this.boss1vaincu,boss2:this.boss2vaincu,tabBoostVie:this.boostViePrise  });
        }
        if (this.player.x > 6300) {
            console.log(this.player.x)
            this.scene.start("donjon1", { origin: this.origine, powerup2: this.powerup2, powerup3: this.powerup3, vieA: this.vieActuelle, vieM: this.vieMax, counterPerle:this.counterPerle,boss1:this.boss1vaincu,boss2:this.boss2vaincu,tabBoostVie:this.boostViePrise  });
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
                this.epee.y = 6200;
                this.epee2.x = 0;
                this.epee2.y = 6200;
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
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x + 70 + 64
                    this.bulles2.y = this.player.y
                    this.bulles2.setAngle(0)
                    this.bulles2.setVelocityX(350);
                    this.bulles2.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x + 70 + 64
                    this.bulles3.y = this.player.y
                    this.bulles3.setAngle(0)
                    this.bulles3.setVelocityX(350);
                    this.bulles3.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x + 70 + 64
                    this.bulles4.y = this.player.y
                    this.bulles4.setAngle(0)
                    this.bulles4.setVelocityX(350);
                    this.bulles4.setVelocityY(0);
                    this.bulleUtil = 0;
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
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x - 70 - 64
                    this.bulles2.y = this.player.y
                    this.bulles2.setAngle(180)
                    this.bulles2.setVelocityX(-350);
                    this.bulles2.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x - 70 - 64
                    this.bulles3.y = this.player.y
                    this.bulles3.setAngle(180)
                    this.bulles3.setVelocityX(-350);
                    this.bulles3.setVelocityY(0);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x - 70 - 64
                    this.bulles4.y = this.player.y
                    this.bulles4.setAngle(180)
                    this.bulles4.setVelocityX(-350);
                    this.bulles4.setVelocityY(0);
                    this.bulleUtil = 0;
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
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x
                    this.bulles2.y = this.player.y - 70 - 64
                    this.bulles2.setAngle(280)
                    this.bulles2.setVelocityX(0);
                    this.bulles2.setVelocityY(-350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x
                    this.bulles3.y = this.player.y - 70 - 64
                    this.bulles3.setAngle(280)
                    this.bulles3.setVelocityX(0);
                    this.bulles3.setVelocityY(-350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x
                    this.bulles4.y = this.player.y - 70 - 64
                    this.bulles4.setAngle(280)
                    this.bulles4.setVelocityX(0);
                    this.bulles4.setVelocityY(-350);
                    this.bulleUtil = 0;
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
                }
                else if (this.bulleUtil == 1) {
                    this.bulles2.x = this.player.x
                    this.bulles2.y = this.player.y + 70 + 64
                    this.bulles2.setAngle(90)
                    this.bulles2.setVelocityX(0);
                    this.bulles2.setVelocityY(350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 2) {
                    this.bulles3.x = this.player.x
                    this.bulles3.y = this.player.y + 70 + 64
                    this.bulles3.setAngle(90)
                    this.bulles3.setVelocityX(0);
                    this.bulles3.setVelocityY(350);
                    this.bulleUtil++
                }
                else if (this.bulleUtil == 3) {
                    this.bulles4.x = this.player.x
                    this.bulles4.y = this.player.y + 70 + 64
                    this.bulles4.setAngle(90)
                    this.bulles4.setVelocityX(0);
                    this.bulles4.setVelocityY(350);
                    this.bulleUtil = 0;
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
                this.player.setVelocityX(-450);
                this.player.anims.play('left', true);
                this.lastFacingDirection = "left"

            }
            else if (this.cursors.right.isDown && this.courantActif == false) {
                this.player.setVelocityX(450);
                this.player.anims.play('right', true);
                this.lastFacingDirection = "right"

            }
            else if (this.courantActif == false) {
                this.player.setVelocityX(0);
            }


            if (this.cursors.up.isDown && this.courantActif == false) {
                this.player.setVelocityY(-450);
                this.player.anims.play('up', true);
                this.lastFacingDirection = "up";


            }
            else if (this.cursors.down.isDown && this.courantActif == false) {
                this.player.setVelocityY(450);
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



    
    playerHitR(player) {
        if (!this.degatsPris) {
            this.degatsPris = true;
            player.setTint(0xff0000);
            this.vieActuelle = this.vieActuelle - 1
            player.scene.cameras.main.shake(500, 0.005);


            setTimeout(() => {
                this.degatsPris = false;
                player.setTint();

            }, 300);
        }

    }


    playerFrappeR(player, requin) {
        this.value = Phaser.Math.Between(0, 10);

        if (this.value <= 5) {
            requin.perle.x = requin.x
            requin.perle.y = requin.y
        }

        if ((this.value >= 6) && (this.value<= 8)) {
            requin.soin.x = requin.x
            requin.soin.y = requin.y

        }
        requin.destroy();

    }


    playerPerle(player, perle) {

        perle.x = 0
        perle.y = 6200
        this.counterPerle++


    }

    playerSoin(player, soin) {
        soin.x = 0
        soin.y = 6200
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

    playerVieUp(player, boost) {
        boost.x = 0
        this.boostViePrise[1]=true
        boost.y = 6200
        console.log(this.vieActuelle)
        if (this.vieMax < 10) {
            this.vieMax = this.vieMax + 2
            this.vieActuelle = this.vieActuelle + 2
            this.l
        }

    }




}