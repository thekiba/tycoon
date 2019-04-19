import { Container } from 'inversify';
import {ShowSiteGame} from "./show-site";
import {GameBehavior} from "../helpers";
import {CreateSiteGame} from "./create-site";
import {LevelUpSiteGame} from "./levelUp-site";

export function containerModule(container: Container): void {
    container.bind(GameBehavior).to(ShowSiteGame);
    container.bind(GameBehavior).to(CreateSiteGame);
    container.bind(GameBehavior).to(LevelUpSiteGame);
}
