import { Component } from '@angular/core';


import { ModalController, PickerController } from '@ionic/angular';
//import de la page meditation
import { MeditationPage } from '../meditation/meditation.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {//on declare nos variables
  public meditationDurationMinutes = 1;
  public meditationDurationSeconds = 60;
  public array = [
    {
      name: 'sunset',
      title: 'Groove',
      imgUrl: '../../assets/groove.jpg',
      sound: '../../assets/sounds/paris.mp3'
    },
    {
      name: 'beach',
      title: 'Rock',
      imgUrl: '../../assets/rock.jpg',
      sound: '../../assets/sounds/rock.mp3'
    },
    {
      name: 'montain',
      title: 'Montagne',
      imgUrl: '../../assets/montain.jpg',
      sound: '../../assets/sounds/enlightened.mp3'
    },
    {
      name: 'forest',
      title: 'Forêt',
      imgUrl: '../../assets/forest.jpg',
      sound: '../../assets/sounds/lucid-dreams.mp3'
    },
    {
      name: 'waves',
      title: 'Vague',
      imgUrl: '../../assets/waves.jpg',
      sound: '../../assets/sounds/thankful.mp3'
    },
    {
      name: 'meditation',
      title: 'Méditation',
      imgUrl: '../../assets/meditation.jpg',
      sound: '../../assets/sounds/transcendence.mp3'
    },
    {
      name: 'night',
      title: 'Nuit',
      imgUrl: '../../assets/night.jpg',
      sound: '../../assets/sounds/world-of-dreams.mp3'
    },
    {
      name: 'lac',
      title: 'Lac',
      imgUrl: '../../assets/lac.jpg',
      sound: '../../assets/sounds/come-in-chill-out.mp3'
    }
  ];

  constructor(//dans le constructeur modal usage et Picker ionic doc
    public modalController: ModalController,
    public pickerCtrl: PickerController
  ) {}
  //modal meditation
  async openMeditation(meditation: any) {//on change le nom de la fonction sera associer a notre click de notre home.page
    //on transmet un parametre avec any ce sera un objet dans notre fonction openMeditation(meditation)
    const modal = await this.modalController.create({
      component: MeditationPage,//non de limport de la page
      componentProps: {//toutes les propreites de meditationest un objet qui contient toutes les infos
        name: meditation.name,
        title: meditation.title,
        imgUrl: meditation.imgUrl,
        sound: meditation.sound,
        duration: this.meditationDurationSeconds
      }
    });
    //pour ouvrir notre page de meditation
    return await modal.present();
  }
//picker
  async openPicker() {
    const picker = await this.pickerCtrl.create({//on creer notre picker
      buttons: [{
        text: 'Valider',
        handler: data => {//handler acces a la valeur de la propriete
          console.log('minutes: ' + data.minutes.value);
          this.meditationDurationSeconds = data.minutes.value;
          this.meditationDurationMinutes = data.minutes.value / 60;
        }
      }],
      columns: [
        {
          name: 'minutes',
          options: [
            {
              text: '1 Minutes',
              value: 60
            },
            {
              text: '3 Minutes',
              value: 180
            },
            {
              text: '5 Minutes',
              value: 300
            },
            {
              text: '7 Minutes',
              value: 420
            },
            {
              text: '10 Minutes',
              value: 600
            }
          ]
        }
      ]
    });
    await picker.present();
  }

}
