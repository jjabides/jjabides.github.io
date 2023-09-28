const descriptionPath = "cartridgeDescriptions/";
const imagesPath = "images/";

export const types = {
    Carousel: "Carousel",
    Demo: "Demo",
}

const cartridgeData = {
    cartridge1: {
        type: types.Demo,
        demoComponent: "SunburstDiagram",
        icon: `${imagesPath}Sunburst_Diagram.png`,
        title: "Sunburst Diagram",
        descriptionUrl: `${descriptionPath}sunburstDiagram.txt`,
        interactiveImg: true,
        previewHeight: '40%'
    },
    cartridge2: {
        type: types.Demo,
        demoComponent: "BlackHole",
        icon: `${imagesPath}Black_Hole.png`,
        title: 'Three.js Black Hole',
        descriptionUrl: `${descriptionPath}black_hole.txt`,
        interactiveImg: true,
        previewHeight: "40%",
        links: [
            {
                title: "Link:",
                link: "https://jj-abides-black-hole.netlify.app/"
            }
        ]
    },
    cartridge3: {
        type: types.Demo,
        demoComponent: "Bowling",
        icon: `${imagesPath}BatEotU_cover.png`,
        title: "Bowling at the Edge of the Universe",
        descriptionUrl: `${descriptionPath}batEotU.txt`,
        interactiveImg: true,
        previewHeight: "40%",
        links: [
            {
                title: "Play at:",
                link: "https://j-seiba.itch.io/bowling-at-the-edge-of-the-universe"
            },
        ]
    },
    cartridge4: {
        // images: [
        //     `${imagesPath}Zenfone_9_Front.JPG`,
        //     `${imagesPath}Zenfone_9_Back.JPG`,
        //     `${imagesPath}Zenfone_9_Wallpapers_app.JPG`,
        // ],
        demoComponent: "Zenfone",
        type: types.Demo,
        icon: `${imagesPath}Zenfone_9_Front.JPG`,
        title: 'Zenfone 9',
        descriptionUrl: `${descriptionPath}zenfone_9.txt`,
        interactiveImg: true,
        previewHeight: "40%",
        links: [
            {
                title: "Link:",
                link: "https://jj-abides-zenfone-9.netlify.app"
            }
        ]
    },
    cartridge5: {
        images: [
            `${imagesPath}Basics_Example_1.gif`,
            `${imagesPath}Basics_Example_2.gif`,
            `${imagesPath}Basics_Example_3.gif`
        ],
        type: types.Carousel,
        icon: `${imagesPath}Absent_Chess_Cover.png`,
        title: "Absent Chess",
        descriptionUrl: `${descriptionPath}absentChess.txt`,
        interactiveImg: true,
        previewHeight: "40%",
        links: [
            {
                title: "Play at:",
                link: "https://j-seiba.itch.io/absent-chess"
            }
        ]
    },
    cartridge6: {
        images: [
            `${imagesPath}Me.jpg`,
        ],
        type: types.Carousel,
        icon: `${imagesPath}Me.jpg`,
        title: "About Me",
        descriptionUrl: `${descriptionPath}aboutMe.txt`,
        interactiveImg: false,
        previewHeight: "30%",
        links: [
            {
                title: "Contact:",
                link: "jj.abides@gmail.com",
                email: true
            },
            {
                title: "LinkedIn:",
                link: "https://www.linkedin.com/in/jjabides/",
            },
        ]
    },
}



export default cartridgeData;