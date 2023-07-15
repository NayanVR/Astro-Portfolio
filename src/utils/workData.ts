const data = {
    "web": [
        {
            title: "ShrinkIt - All in one URL shortener & manager",
            imgName: "shrinkit.png",
            link: "https://www.shrinkit.in"
        },
        {
            title: "Algo Vibe - Algorithm visualization platform",
            imgName: "algovibe.png",
            link: "https://algo-vibe.vercel.app/"
        },
        {
            title: "Chatbot for GSFC University",
            imgName: "chatbot.png",
            link: "https://www.gsfcuni.edu.in/"
        },
        {
            title: "PONG! - A multiplayer game",
            imgName: "pong.png",
            link: "https://pong-pi.vercel.app/"
        },
        {
            title: "Ripple effect using JS",
            imgName: "ripple.png",
            link: "https://grid-ripple-effect.vercel.app/"
        },
    ],
    "graphic": [
        {
            title: "Watches poster",
            imgName: "watches.png",
            link: "drive.google.com/file/d/1cHlDIwhKzVP667zqfqLo5IBG2P2GTxO9/view?usp=share_link"
        },
        {
            title: "Stand-up comedy event poster",
            imgName: "tcf banner.png",
            link: "drive.google.com/file/d/1dj92BFfEAUEGn00PhJ3DNPLRW1PR4w_w/view?usp=share_link"
        },
        {
            title: "Poha packaging design for local business",
            imgName: "poha.png",
            link: "drive.google.com/file/d/1_d6VTlchrWS_bzPZbj1UbVb8TE_CgPbO/view?usp=share_link"
        },
        {
            title: "Sweet shop poster for local business",
            imgName: "harsh.png",
            link: "drive.google.com/file/d/1tii7B1uoCCJ3uxEs_EX5HY-WOkm_I4AO/view?usp=share_link"
        },
        {
            title: "Offer on burgers poster",
            imgName: "burger.png",
            link: "drive.google.com/file/d/13dcVmdvS5IIbIQIiBK0D70M_fmD5vPRb/view?usp=share_link"
        },
        {
            title: "Sneakers demo poster",
            imgName: "shoes.png",
            link: "drive.google.com/file/d/1RXSNReVMXD6zP-8pcyPbRX0M_TTO1J70/view?usp=share_link"
        },
        {
            title: "We are hiring poster",
            imgName: "7pm.png",
            link: "drive.google.com/file/d/1Zy5FK4BoowsFP6w4xBPz9RSil3Ld1s6A/view?usp=share_link"
        },
    ],
    "ui": [
        {
            title: "E-commerce app UI",
            imgName: "e-commerce.png",
            link: "www.uplabs.com/posts/e-commerce-app-ui-concept-for-android-and-ios"
        },
        {
            title: "Apple news app UI Redesign",
            imgName: "apple news.png",
            link: "www.uplabs.com/posts/news-app-ui-concept-a6475e82-516d-49eb-afa3-3d36b80b00f9"
        },
        {
            title: "Grocery app UI",
            imgName: "grocery.png",
            link: "www.uplabs.com/posts/grocery-ui-concept-for-android-and-ios-949e4b63-12a2-4497-9fe1-77cae0b383e0"
        },
        {
            title: "Fitbone - fitness app UI",
            imgName: "fitness.png",
            link: "www.uplabs.com/posts/fitbone-fitness-app-ui-for-android-and-ios"
        },
        {
            title: "Contact app UI",
            imgName: "contact.png",
            link: "www.uplabs.com/posts/contact-app-ui-concept-for-android-and-ios"
        },
        {
            title: "Yoga app UI",
            imgName: "yoga.png",
            link: "www.uplabs.com/posts/modern-yoga-app-ui-template"
        },
    ],
    "logo": [
        {
            title: "Vadodara Bucketlist - Instagram page logo",
            imgName: "vb.png",
            link: "https://www.instagram.com/vadodara_bucketlist/"
        },
        {
            title: "Sneak Logo",
            imgName: "sneak.png",
            link: "drive.google.com/file/d/1kADPLUmXgLfKguD7crp0rMqJ0WutTwCM/view?usp=share_link"
        },
        {
            title: "Rajwada Rajputi Poshak Logo",
            imgName: "rrp.png",
            link: ""
        },
        {
            title: "The Fitness Monk - GYM Logo",
            imgName: "fitness monk.png",
            link: ""
        },
        {
            title: "Eagles - E-sports Logo",
            imgName: "eagle.png",
            link: "drive.google.com/file/d/1ihpqrXaewU5eFK-UyG51KN4XFQpQ8Uov/view?usp=share_link"
        },
        {
            title: "Park Logo",
            imgName: "pikake.png",
            link: "drive.google.com/file/d/1pEzGH_Tbr0_wnsePKFIw6nhFQQf53QxZ/view?usp=share_link"
        },
        {
            title: "Bicycle Logo",
            imgName: "bicycle.png",
            link: "drive.google.com/file/d/1CgdC8MdiSHkKVYQHswBFBUVD_BYnZJhv/view?usp=share_link"
        },
    ],
}

export const getCardsData = (type: keyof typeof data) => data[type].map((item) => item);
export type CategoryType = keyof typeof data;