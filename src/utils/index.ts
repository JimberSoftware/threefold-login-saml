import pako from 'pako';
import {xml2js} from 'xml-js';
import {XmlAttributeFields} from "../types";

export const inflateXaml = (xml: string): string => {
    const decoded = Buffer.from(xml, 'base64');
    return pako.inflateRaw(decoded, { to: 'string' });
}

export const extractXmlAttributeFields = (inflatedXaml: string, attributeFields: string[]): any => {
    const { elements } = xml2js(inflatedXaml);
    const element = elements[0];

    const xmlAttributeFields: XmlAttributeFields = {};
    attributeFields.forEach((attributeField: string) => {
        if (!element.attributes[attributeField]) {
            return;
        }
        xmlAttributeFields[attributeField.toLowerCase()] = (element.attributes[attributeField]);
    });

    return xmlAttributeFields;
}

export const encodeSaml = (xml: string): string => {
    const buffer = Buffer.from(xml);
    return buffer.toString('base64');
}
