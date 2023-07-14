interface CardData {
    title: string;
    imgName: string;
    link: string;
}

const data = {
    "web": [
        {
            title: "ShrinkIt",
            imgName: "shrinkit.png",
            link: "https://www.shrinkit.in"
        },
        {
            title: "Algo Vibe",
            imgName: "algovibe.png",
            link: "https://algo-vibe.vercel.app/"
        },
        {
            title: "Algo Vibe",
            imgName: "algovibe.png",
            link: "https://algo-vibe.vercel.app/"
        },
        {
            title: "ShrinkIt",
            imgName: "shrinkit.png",
            link: "https://www.shrinkit.in"
        },
    ],
}

export const getCardsData = (type: keyof typeof data) => data[type].map((item: CardData) => item);
export type CategoryType = keyof typeof data;