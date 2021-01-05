import ejs, {TemplateFunction} from 'ejs';
import {readFileSync} from 'fs';
import path from "path";

export const getTemplateForType = (type: string): TemplateFunction => {
    const template = readFileSync(path.join(__dirname, `./data/${type}.ejs`));
    return ejs.compile(template.toString());
}