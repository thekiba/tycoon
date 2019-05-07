import { inject, injectable } from 'inversify';
import { sleep } from '../utils';
import { Specialty } from '../enums';
import {
  Ad,
  AddWorkerResponse,
  CancelTaskResponse, CancelVacationResponse,
  Content,
  CreateSiteResponse,
  FindAdResponse,
  InitResponse,
  LevelUpSiteResponse, SendVacationResponse,
  Site,
  Task,
  Worker
} from '../interfaces';

// declare var require: any;
// declare var fetch: any;
// let fetchApi;
// if (fetch) {
//   fetchApi = fetch;
// } else {
//   fetchApi = require('node-fetch');
// }

var fetch = fetch ? fetch : require('node-fetch');

// level up
// https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb5570a4d7b1b1d2c30c4b4/levelUp?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555396535165

// снятие работников
// fetch("https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb5570a4d7b1b1d2c30c4b4/5cb557820a74af08521ade4d?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555402018724",
// { "credentials": "include", "headers": { "accept": "application/json, text/plain, */*", "accept-language": "en,ru;q=0.9",
// "cache-control": "no-cache", "content-type": "application/json;charset=UTF-8", "pragma": "no-cache" }, "referrer":
// "https://game.web-tycoon.com/players/PLAYER_ID/workers/5cb557820a74af08521ade4d", "referrerPolicy":
// "no-referrer-when-downgrade", "body": "{\"taskId\":\"5cb57d985c1ff61d2217cb0f\"}", "method": "DELETE", "mode": "cors" });
// fetch("https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb5570a4d7b1b1d2c30c4b4/5cb557cd0a74af08521adec9?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555402045554",
// { "credentials": "include", "headers": { "accept": "application/json, text/plain, */*", "accept-language": "en,ru;q=0.9",
// "cache-control": "no-cache", "content-type": "application/json;charset=UTF-8", "pragma": "no-cache" }, "referrer":
// "https://game.web-tycoon.com/players/PLAYER_ID/workers/5cb557cd0a74af08521adec9", "referrerPolicy":
// "no-referrer-when-downgrade", "body": "{\"taskId\":\"5cb57d9a43916e1d602b02ea\"}", "method": "DELETE", "mode": "cors" });
// fetch("https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb5570a4d7b1b1d2c30c4b4/5cb5696b0a74af08521b087f?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555402057075", { "credentials": "include", "headers": { "accept": "application/json, text/plain, */*", "accept-language": "en,ru;q=0.9", "cache-control": "no-cache", "content-type": "application/json;charset=UTF-8", "pragma": "no-cache" }, "referrer": "https://game.web-tycoon.com/players/PLAYER_ID/workers/5cb5696b0a74af08521b087f", "referrerPolicy": "no-referrer-when-downgrade", "body": "{\"taskId\":\"5cb57d9e8c37f21c1ca82bd1\"}", "method": "DELETE", "mode": "cors" });

// посадка работников
// fetch("https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb5570a4d7b1b1d2c30c4b4/3/addTask?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555396704200",
// { "credentials": "include", "headers": { "accept": "application/json, text/plain, */*", "accept-language": "en,ru;q=0.9",
// "cache-control": "no-cache", "content-type": "application/json;charset=UTF-8", "pragma": "no-cache" }, "referrer":
// "https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb5570a4d7b1b1d2c30c4b4", "referrerPolicy":
// "no-referrer-when-downgrade", "body": "{\"workerIds\":[\"5cb557820a74af08521ade4d\"]}", "method": "POST", "mode": "cors" });
// fetch("https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb5570a4d7b1b1d2c30c4b4/2/addTask?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555396707072",
// { "credentials": "include", "headers": { "accept": "application/json, text/plain, */*", "accept-language": "en,ru;q=0.9",
// "cache-control": "no-cache", "content-type": "application/json;charset=UTF-8", "pragma": "no-cache" }, "referrer":
// "https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb5570a4d7b1b1d2c30c4b4", "referrerPolicy":
// "no-referrer-when-downgrade", "body": "{\"workerIds\":[\"5cb557cd0a74af08521adec9\"]}", "method": "POST", "mode": "cors" });
// fetch("https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb5570a4d7b1b1d2c30c4b4/1/addTask?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555396709551", { "credentials": "include", "headers": { "accept": "application/json, text/plain, */*", "accept-language": "en,ru;q=0.9", "cache-control": "no-cache", "content-type": "application/json;charset=UTF-8", "pragma": "no-cache" }, "referrer": "https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb5570a4d7b1b1d2c30c4b4", "referrerPolicy": "no-referrer-when-downgrade", "body": "{\"workerIds\":[\"5cb5696b0a74af08521b087f\"]}", "method": "POST", "mode": "cors" });

// создание сайта
// fetch("https://game.web-tycoon.com/api/users/PLAYER_ID/sites?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555439648735",
// {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","content-type":"application/json;charset=UTF-8","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/create","referrerPolicy":"no-referrer-when-downgrade","body":"{\"domain\":\"fox03.free\",\"sitetypeId\":2,\"sitethemeId\":11,\"engineId\":7,\"domainzoneId\":1}","method":"POST","mode":"cors"});

// улучшение сайта
// fetch("https://game.web-tycoon.com/api/sites/PLAYER_ID/5cb6202014b57b25f13b75d2/levelUp?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555440379921",
// {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb6202014b57b25f13b75d2","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// поиск рекламы
// fetch("https://game.web-tycoon.com/api/ad_s/ad/PLAYER_ID/generateOffers/5cb6202014b57b25f13b75d2/1?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555440683971", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb6202014b57b25f13b75d2","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// запуск рекламы
// fetch("https://game.web-tycoon.com/api/ad_s/PLAYER_ID/5cb6202014b57b25f13b75d2/add?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555441138266", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","content-type":"application/json;charset=UTF-8","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb6202014b57b25f13b75d2","referrerPolicy":"no-referrer-when-downgrade","body":"{\"adId\":\"5cb62559e3685a24102becaf\"}","method":"POST","mode":"cors"});

// остановка рекламы
// fetch("https://game.web-tycoon.com/api/ad_s/PLAYER_ID/5cb62559e3685a24102becaf/cancel?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555441443741",
// {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb6202014b57b25f13b75d2","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"DELETE","mode":"cors"});

// удаление рекламы
// fetch("https://game.web-tycoon.com/api/ad_s/PLAYER_ID/5cb63972e3685a24102c3035/delete?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555626514429", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb638c42d2d5625b6b36315","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"DELETE","mode":"cors"});

// сослаться на этот сайт
// fetch("https://game.web-tycoon.com/api/links/PLAYER_ID/5cb64fe5ab4e8c256f30e2e8/5cb5570a4d7b1b1d2c30c4b4/1?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555478970453",
// {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb5570a4d7b1b1d2c30c4b4","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// добавить ссылку по имени
// fetch("https://game.web-tycoon.com/api/links/PLAYER_ID/5cb64f9c14b57b25f13caa98/fox.com?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555479446779",
// {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb64f9c14b57b25f13caa98","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// найти оффер
// fetch("https://game.web-tycoon.com/api/workers/PLAYER_ID/generateOffers/0?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555480522048", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/workers/hire","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// удалить оффер
// fetch("https://game.web-tycoon.com/api/workers/PLAYER_ID/5cb65fa6e3685a24102c92f8/deleteOffer?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555480488218",
// {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/workers/hire","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"DELETE","mode":"cors"});

// принять оффер
// fetch("https://game.web-tycoon.com/api/workers/PLAYER_ID/hire/5cb6c0e6e3685a24102d3256?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555620438477", {"credentials":"omit","headers":{"accept":"application/json, text/plain, */*"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/workers/hire","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// добавить контент на сайт
// fetch("https://game.web-tycoon.com/api/content/PLAYER_ID/5cb56a5d8c37f21c1ca79948/5cb6cd16b55184245fe9eb61?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555487145824", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb56a5d8c37f21c1ca79948","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// завершить таск (может быть платно)
// fetch("https://game.web-tycoon.com/api/tasks/PLAYER_ID/5cb8e3cef2e5c847fe4e3eba/finish?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555621003854", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/workers/hire","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// апгрейд
// fetch("https://game.web-tycoon.com/api/hostings/PLAYER_ID/2/change?access_token=ACCESS_TOKEN&connectionId=CONNECTION_ID&ts=1555655495898", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","content-type":"application/json;charset=UTF-8","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/PLAYER_ID/sites/5cb64ba514b57b25f13c9846","referrerPolicy":"no-referrer-when-downgrade","body":"{\"siteId\":\"5cb64ba514b57b25f13c9846\"}","method":"POST","mode":"cors"});

// оплата хостинга
// fetch("https://game.web-tycoon.com/api/hostings/5cb555c4adc1f41d6a813939/5cb6515e2d2d5625b6b3e609/payInAdvance?access_token=ACCESS_TOKEN&connectionId=connectionId&ts=1555711801484", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/5cb555c4adc1f41d6a813939/sites/5cb6515e2d2d5625b6b3e609","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"POST","mode":"cors"});

// перепланировать задачи
// fetch("https://game.web-tycoon.com/api/sitekfparams/5cb555c4adc1f41d6a813939/5cb5570a4d7b1b1d2c30c4b4/add?access_token=wn5CuJG3b6FTfvSfQqkPkw962LbD4jrEadUMOBWYLdzvTVGAV5QWMXj0nWHSuCeK&connectionId=8b95d41390fbcce61fff54ad5ccf0673&ts=1555714183980", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","content-type":"application/json;charset=UTF-8","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/5cb555c4adc1f41d6a813939/sites/5cb5570a4d7b1b1d2c30c4b4","referrerPolicy":"no-referrer-when-downgrade","body":"{\"params\":{\"design\":34,\"frontend\":33,\"backend\":33}}","method":"POST","mode":"cors"});

// получение информации о друге
// fetch("https://game.web-tycoon.com/api/users/5cb555c4adc1f41d6a813939/5cb32a1943916e1d601810f9/getUserInfo?access_token=wn5CuJG3b6FTfvSfQqkPkw962LbD4jrEadUMOBWYLdzvTVGAV5QWMXj0nWHSuCeK&connectionId=bc50853f9159fbf692d527bfe624fbd4&ts=1556043959629", {"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"en,ru;q=0.9","cache-control":"no-cache","pragma":"no-cache"},"referrer":"https://game.web-tycoon.com/players/5cb32a1943916e1d601810f9","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});

// id: "5cb62514b0f273257557416f"
// personId: "PLAYER_ID"
// siteId: "5cb5894e5c1ff61d221829d0"

export class ApiConfig {
  player: string;
  access_token: string;
  connectionId: string;
  mainDomain: string;
  sitePrefix: string;
  sitePostfix: string;
}

@injectable()
export class Api {

  private readonly player: string;
  private readonly access_token: string;
  private readonly connectionId: string;

  private static get ts(): number {
    return new Date().getTime();
  }

  constructor(@inject(ApiConfig) config: ApiConfig) {
    console.assert(!!config.player, '`player` should be not null');
    console.assert(!!config.access_token, '`access_token` should be not null');
    console.assert(!!config.connectionId, '`connectionId` should be not null');

    this.player = config.player;
    this.access_token = config.access_token;
    this.connectionId = config.connectionId;
  }

  init(): Promise<InitResponse> {
    return this.request(`https://game.web-tycoon.com/api/users/${ this.player }/init`, 'GET');
  }

  cancelTask(task: Task): Promise<CancelTaskResponse[]> {
    if (!task.siteId || !task.workers) {
      return Promise.resolve([]);
    }

    try {
      const requests = task.workers.map((worker) =>
        this.request<CancelTaskResponse>(
          `https://game.web-tycoon.com/api/sites/${ this.player }/${ task.siteId }/${ worker }`,
          'DELETE',
          { taskId: task.id }
        )
      );
      return Promise.all(requests);
    } catch (e) {
      return Promise.resolve([]);
    }
  }

  addWorker(site: Site, workers: Worker[], slot: Specialty): Promise<AddWorkerResponse> {
    return this.request(
      `https://game.web-tycoon.com/api/sites/${ this.player }/${ site.id }/${ slot }/addTask`,
      'POST',
      { workerIds: workers.map((worker) => worker.id) }
    );
  }

  createSite(domain: string): Promise<CreateSiteResponse> {
    return this.request(`https://game.web-tycoon.com/api/users/${ this.player }/sites`, 'POST', {
      domain,
      'sitetypeId': 2,
      'sitethemeId': 11,
      'engineId': 7,
      'domainzoneId': 1
    });
  }

  levelUpSite(site: Site): Promise<LevelUpSiteResponse> {
    return this.request(`https://game.web-tycoon.com/api/sites/${ this.player }/${ site.id }/levelUp`, 'POST');
  }

  findAd(site: Site, adType: 0 | 1): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/ad_s/ad/${ this.player }/generateOffers/${ site.id }/${ adType }`, 'POST');
  }

  addAd(ad: Ad, site: Site = { id: ad.siteId } as any): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/ad_s/${ this.player }/${ site.id }/add`, 'POST', {
      adId: ad.id
    });
  }

  cancelAd(ad: Ad): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/ad_s/${this.player}/${ad.id}/cancel`, 'DELETE');
  }

  deleteAd(ad: Ad): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/ad_s/${this.player}/${ad.id}/delete`, 'DELETE');
  }

  addLink(from: Site, to: Site): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/links/${ this.player }/${ from.id }/${ to.id }/1`, 'POST');
  }

  addLinkByDomain(from: Site, to: string): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/links/${ this.player }/${ from.id }/${ to }`, 'POST');
  }

  enableContent(site: Site, content: Content): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/content/${ this.player }/${ site.id }/${ content.id }`, 'POST');
  }

  changeHosting(site: Site, hosting: 1 | 2 | 3): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/hostings/${this.player}/${hosting}/change`, 'POST', {
      siteId: site.id
    });
  }

  payForHosting(site: Site): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/hostings/${this.player}/${site.id}/payInAdvance`, 'POST');
  }

  normalizeSite(site: Site): Promise<FindAdResponse> {
    return this.request(`https://game.web-tycoon.com/api/sitekfparams/${this.player}/${site.id}/add`, 'POST', {
      params: { backend: 33, frontend: 33, design: 34 }
    });
  }

  getUserInfo(userId: string): Promise<InitResponse> {
    return this.request(`https://game.web-tycoon.com/api/users/${this.player}/${userId}/getUserInfo`, 'GET');
  }

  sendVacation(worker: Worker): Promise<SendVacationResponse>{
    return this.request(`https://game.web-tycoon.com/api/workers/${this.player}/vacation/send/${worker.id}`, 'POST');
  }

  cancelVacation(worker: Worker, task: Task): Promise<CancelVacationResponse>{
    return this.request(`https://game.web-tycoon.com/api/tasks/${this.player}/${task.id}/${worker.id}/cancelVacation`, 'POST');
  }

  private async request<T>(url, method, body = null): Promise<T> {
    console.assert(url, '"url" should be not null');
    console.assert([ 'GET', 'POST', 'DELETE' ].indexOf(method) > -1, '"method" should be GET, POST or DELETE');
    await sleep(1100);
    return fetch(url + `?access_token=${this.access_token}&connectionId=${this.connectionId}&ts=${Api.ts}`, {
      'credentials': 'include',
      'headers': {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en,ru;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json;charset=UTF-8',
        'pragma': 'no-cache'
      },
      'referrer': 'https://game.web-tycoon.com/',
      'referrerPolicy': 'no-referrer-when-downgrade',
      'body': body ? JSON.stringify(body) : null,
      'method': method,
      'mode': 'cors'
    }).then((response) => response.json());
  }
}
