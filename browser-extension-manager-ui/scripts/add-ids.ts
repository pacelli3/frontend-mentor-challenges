import {v4 as uuidv4} from "uuid";
import fs from "node:fs/promises";
import path from "node:path";

interface Extension {
    id: number;
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
}

const addIds = async () => {
    const pathToData = path.join("app", "data.json");
    const extensionsData = JSON.parse(await fs.readFile(pathToData, {encoding: "utf8"})) as Partial<
        Extension[]
    >;

    const newExtensionData = extensionsData.map(extension => ({id: uuidv4(), ...extension}));

    await fs.writeFile(pathToData, JSON.stringify(newExtensionData, null, 4));
};

addIds()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    });
