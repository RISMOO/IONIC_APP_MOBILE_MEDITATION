import { Component } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular"; //import du modal et du comme la page home.page.ts
import { NavParams } from "@ionic/angular"; //import module pour tarnsfereer des info de notre page home a notre page meditation a l'autre
import { Stopwatch } from "ts-stopwatch"; //minuteur (https://www.npmjs.com/package/ts-stopwatch)
const stopwatch = new Stopwatch(); //dans notre variable stopwatch nous avons un objet Stopwatch
import { NativeAudio } from "@ionic-native/native-audio/ngx";
//import native audio et dans le constructor

@Component({
  selector: "app-meditation",
  templateUrl: "./meditation.page.html",
  styleUrls: ["./meditation.page.scss"],
})
export class MeditationPage {
  //creation de variables
  //on va stocker la durée de la meditation
  meditationDuration: number;
  title: string;
  imgUrl: string;
  sound: string;
  timer: any; //chrono cette variabvle sera injecyet dans notre round-progress de la meditaion.page.html
  // counter = 0;
  minutes = "00";
  seconds = "00";
  butttonIcon = "pause"; //bouton dynamique []
  //voir home.page.ts
  //dans le constructeur modal + navParams
  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    public navParams: NavParams,
    private nativeAudio: NativeAudio
  ) {
    this.sound = this.navParams.get("sound");
    this.title = this.navParams.get("title");
    this.imgUrl = this.navParams.get("imgUrl");
    this.meditationDuration = this.navParams.get("duration") * 1000;
    this.readSound();
    this.countDown();
    // this.readSound();//pour tester ma fonction dans la console
    //ionic cordova run browser
    //Le but de la plateforme Browser est de faire tourner des applications destinées à des appareils mobiles dans un navigateur web (Chrome). ... Bref utiliser les mêmes Api que sur l'appareil de destination dans un simple navigateur w
  }

  //native audio lancement de la lecture audio
  readSound() {
    this.nativeAudio.preloadSimple("sound", this.sound).then(   //this.sound adresse de notre fichier mp3
      (onSuccess) => {
          //si success on execute le code suivanton  affichera un message
        console.log(onSuccess);
        this.nativeAudio.loop("sound");
      },
      (onError) => {
        console.log(onError);
      }
    );
    this.playToast();
  }
  //fonction chrono
  countDown() {
    //on lance notre chrono
    stopwatch.start(); //plugin stopwatch
    setInterval(() => {
      const time = stopwatch.getTime(); //on recupere ler temps restant en seconde et en minute
      this.timer = time; //on recupere le tempps restant evolution de mon compte a rebours
      const timeInSeconds = Math.floor(time / 1000); //Math.floor recupere la valeur entiere  et on divise la valeur par mille pour avoir les secondes
      const minutes = Math.floor(timeInSeconds / 60); //valeur en minute
      const seconds = timeInSeconds - minutes * 60; //temps restant en seconde
      if (minutes < 10) {
        this.minutes = "0" + minutes;
      } else {
        this.minutes = minutes.toString(); //converti un nombre en chaine de caractere
      }
      if (seconds < 10) {
        this.seconds = "0" + seconds;
      } else {
        this.seconds = seconds.toString();
      }
    }, 100); //miliseconde
  }

  playPause() {
    console.log(stopwatch.getState());
    if (stopwatch.getState() == "RUNNING") {//si notre chronometre est en route on recuopere son statu
      this.pauseToast();
      stopwatch.stop();//si le lecteure est en play
      this.butttonIcon = "play";
      this.nativeAudio.stop("sound");
    } else {
      this.playToast();
      stopwatch.start();//on redemarre nbotre chrono avec le packahe stopwatch
      this.butttonIcon = "pause";//on passe l'icon a pause
      this.nativeAudio.loop("sound");//onn relance la musique
    }
  }
 //pour fermer la page modal
  close() {
    this.timer = 0;
    stopwatch.reset();
    this.nativeAudio.stop("sound");
    this.modalController.dismiss();
  }

  async playToast() {
    const toast = await this.toastController.create({
      message: "Musique en cours de lecture.",
      duration: 2000,
    });
    toast.present();
  }

  async pauseToast() {
    const toast = await this.toastController.create({
      message: "Musique en pause.",
      duration: 2000,
    });
    toast.present();
  }
}
