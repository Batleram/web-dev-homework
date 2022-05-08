type Card = {
    cardid: string;
    name: string;
    userid: string;
    attribute_points: string;
    attributes: Attribute[];
    stats: Stat[];
    points: Point[];
}

type Attribute = {
    name: string;
    value: "string"
}

type Stat = {
    name: string;
    value: "string"
}

type Point = {
    "x": string;
    "y": string;
}
