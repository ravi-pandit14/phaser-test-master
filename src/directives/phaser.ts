import { Injectable, Pipe, Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import * as Phaser from "phaser-ce";
import * as KineticScrolling from "phaser-kinetic-scrolling-plugin";
import moment from 'moment';
import _ from "lodash";



export class PhaserScroller {
    screenHeight: number;
    screenWidth: number;
    game: any;
    isSceneInitialized: boolean;
    mountainsBack: any;
    mountainsMid1: any;
    mountainsMid2: any;
    eyewheels: any;
    sceneWidth: number;
    scroll: any;
    sky: any;
    sceneGeometry: any = [];
    day: any;
    date_as_int: number;
    rectangles: any = [];
    index: any;
    constructor() {

    }
    setGame() {
        // console.log('at setGame time is ', moment().format('hh:mm:ss'));
        this.screenHeight = window.innerHeight * 0.72;
        this.screenWidth = window.innerWidth; // * window.devicePixelRatio
        this.game = new Phaser.Game(
            window.innerWidth * window.devicePixelRatio,  //width
            window.innerHeight * 0.72, //height
            Phaser.CANVAS, //renderer
            'gamepo', //parent or DOM element id
            { preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this), render: this.render.bind(this) }, //state object
            true, //transparent
            false, //antialias
            { enableDebug: false } //physics config object
        );
        this.game.config = {
            antialias: false,
            enableDebug: true,
            scaleMode: 3
        };
        this.isSceneInitialized = false;
    }
    //     render() {
    // console.log("render",this.game.debug)
    //         // Input debug info
    //         this.game.input.mspointer.capture = false;
    //         this.game.debug.isDisabled=false
    //         // this.game.debug.inputInfo(32, 32);
    //         // this.game.debug.spriteInputInfo(sprite, 32, 130);
    //         // this.game.debug.pointer( this.game.input.activePointer );

    //     }

    preload() {

        console.log('at preload id is ', this.game);
        // console.log('at preload id is ', this.game.plugins.add(Phaser.Plugin.KineticScrolling));
        console.log('at preload id is ', this.game.id);
        console.log("at preload KineticScrolling: ", KineticScrolling);
        this.game.stage.disableVisibilityChange = true;
        this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        // this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        this.game.load.image('mountains-back', 'assets/1.png');
        this.game.load.image('mountains-mid1', 'assets/2.png', 518, 198);
        this.game.load.image('mountains-mid2', 'assets/3.png', 512, 256);
        this.game.input.mspointer.capture = false;

    }

    create() {
        // this.sceneWidth = 32000;
        var vm = this;
        console.log('at preload id is ', this.game);
        this.game.kineticScrolling.configure({
            kineticMovement: true,
            timeConstantScroll: 325, //really mimic iOS
            horizontalScroll: true,
            verticalScroll: false,
            horizontalWheel: true,
            verticalWheel: false,
            deltaWheel: 40
        });
        //Enable Arcade Physics
        // this.game.input.mspointer.stop()
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.kineticScrolling.start();
        var initX = 50;
        this.game.input.mspointer.capture = false;
        // this.game.onPause.add(function () { vm.onGamePause() });
        this.game.input.addMoveCallback(function () { vm.moveCallBack() })
        this.game.input.onDown.add(function () { vm.onTap() });
        // add a third pointer
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        // maybe even a forth
        for (var i = 0; i < 26; i++) {
            this.rectangles.push(this.createRectangle(initX, this.game.world.centerY - 100, 250, 200));
            this.index = this.game.add.text(initX + 125, this.game.world.centerY, i + 1,
                { font: 'bold 150px Arial', align: "center" });
            this.index.anchor.set(0.5);
            initX += 300;
        }
        this.game.world.setBounds(0, 0, 320 * this.rectangles.length, this.game.height);

    }
    onTap() {
        var vm = this;
        console.log('this.game.input.activePointer', this.game.input.activePointer);
        if (this.game.input.activePointer.id == 1) {
            vm.game.input.pointers[1].active = false;
        }
        if (this.game.input.activePointer.id == 2) {
            vm.game.input.pointers[0].active = false;
        }
        if (this.game.input.activePointer.id >= 3) {
            var points = this.game.input.pointers;
            points.forEach(function (pointer, index) {
                vm.game.input.pointers[index].active = false;
            });
        }
    };
    render() {
        var vm = this;
        var debug = this.game.debug;
        debug.inputInfo(20, 20, "red");
        debug.pointer(this.game.input.activePointer, "yellow");
        debug.device(420, 20, "black");
        debug.phaser(10, 580, "gray");

        //    monitorEvents(document, 'control');

        // grabbing a ref to the display object this way
        // var avg = this.game.world.children[0];

        // points is short for the pointer array
        var points = this.game.input.pointers;

        // set some default values for the display object
        // avg.x = 0;
        // avg.y = 0;

        // // the data object of a display object comes in handy for things like this
        // avg.data.activeCount = 0;

        // loop over all pointers
        points.forEach(function (pointer, index) {
            // is the pointer active?
            if (pointer.active) {
                // console.log("pointer", pointer)
                // if (pointer.id == 3) {
                //     vm.game.input.pointers[index].active = false;
                // }
                // 

                // if so count it as part of the average
                // avg.x += pointer.x;
                // avg.y += pointer.y;
                // avg.data.activeCount += 1;

            }

        });

        // // divide the sum over count of values for average
        // avg.x /= avg.data.activeCount;
        // avg.y /= avg.data.activeCount;

    }
    moveCallBack() {
        if (this.game.input.activePointer.id >= 3) {
            this.game.input.pointers[0].active = false;
            this.game.input.pointers[1].active = false;
            if (this.game.input.pointers[2].active == true) {
                this.game.input.pointers[2].active = false;
            }
        }
        // this.game.input.touch.preventDefault = false;
        // console.log("this.gamethis.gamethis.game",this.game)
        // this.game.input.mspointer.active=true;
        // this.game.input.mspointer.start();
        // this.game.input.mspointer.capture = true;
        // console.log("moveCallBack:",this.game.input.mspointer)
        // debug.setText('Pause')
    };

    createRectangle(x, y, w, h) {
        var sprite = this.game.add.graphics(x, y);
        sprite.beginFill(Phaser.Color.getRandomColor(100, 255), 1);
        sprite.bounds = new PIXI.Rectangle(0, 0, w, h);
        sprite.drawRect(0, 0, w, h);
        return sprite;
    }
    update() {
        // this.game.input.mspointer.capture = false;
        // this.mountainsBack.tilePosition.x -= 0.05;
        // this.mountainsMid1.tilePosition.x -= 0.3;
        // this.mountainsMid2.tilePosition.x -= 0.75; 
    }

}