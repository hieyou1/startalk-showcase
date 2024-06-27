export interface Project {
    "type": "web" | "data",
    "id": string,
    "picture": string | undefined,
    "title": string,
    "description": string | undefined,
    "author": {
        "hanzi": string,
        "pinyin": string,
        "english": string
    },
    "url": string
}
export type Projects = {
    "$schema": "./projects.schema.json" | "../projects.schema.json",
    "projects": Project[]
};