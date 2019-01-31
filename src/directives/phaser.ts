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
    rectangles: any=[];
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
            { preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this),render: this.render.bind(this) }, //state object
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
        this.game.load.image('mountains-mid1', 'assets/2.png',518, 198);
        this.game.load.image('mountains-mid2', 'assets/3.png',512, 256);
        this.game.input.mspointer.capture = false;

    }
   
    create() {
        // this.sceneWidth = 32000;
        var vm=this;
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
        this.game.input.onDown.add(function () { vm.onTap()});
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
        this.game.input.mspointer.capture = false;

        // console.log('this.game.input.activePointer',this.game.input.activePointer);
        // debug.setText('tap', true);
      };
      render() {
        var debug = this.game.debug;
        debug.inputInfo(20, 20, "red");
        debug.pointer(this.game.input.activePointer, "yellow");
        debug.device(420, 20, "black");
        debug.phaser(10, 580, "gray");
    //    monitorEvents(document, 'control');
      }
    moveCallBack() {
        // this.game.input.touch.preventDefault = false;
        // console.log("this.gamethis.gamethis.game",this.game)
        // this.game.input.mspointer.active=true;
        // this.game.input.mspointer.start();
        // this.game.input.mspointer.capture = true;
        // console.log("moveCallBack:",this.game.input.mspointer)
        // debug.setText('Pause')
      };
    
    createRectangle (x, y, w, h) {
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