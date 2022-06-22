const descriptionPath = "cartridgeDescriptions/";
const imagesPath = "images/";

export const types = {
    Carousel: "Carousel",
    Demo: "Demo",
}

const cartridgeData = {
    cartridge1: {
        type: types.Demo,
        icon: `${imagesPath}Sunburst_Diagram.png`,
        title: "Sunburst Diagram",
        descriptionUrl: `${descriptionPath}sunburstDiagram.txt`,
        interactiveImg: true,
        previewHeight: '40%'
    },
    cartridge2: {
        images: [
            `${imagesPath}Track_Attack_Gameplay.gif`,
            `${imagesPath}Track_Attack_Preview1.PNG`,
            `${imagesPath}Track_Attack_Preview3.PNG`
        ],
        type: types.Carousel,
        icon: `${imagesPath}Track_Attack_Preview1.PNG`,
        title: "Track Attack",
        descriptionUrl: `${descriptionPath}trackAttack.txt`,
        interactiveImg: true,
        previewHeight: "40%",
        links: [
            {
                title: "Promotional Video:",
                link: "https://www.youtube.com/watch?v=73vEu0uQ9Zo&feature=youtu.be"
            },
            {
                title: "Download Link:",
                link: "https://drive.google.com/file/d/1jnN2yKuC7CQgsLAKahJ4ogkLZ2n3FsAp/view?usp=sharing"
            }
        ]
    },
    cartridge3: {
        images: [
            `${imagesPath}AbsentChess_Gameplay.gif`,
            `${imagesPath}AbsentChess_Gameplay2.gif`,
            `${imagesPath}AbsentChess_Preview1.PNG`
        ],
        type: types.Carousel,
        icon: `${imagesPath}AbsentChess_Preview1.PNG`,
        title: "Absent Chess",
        descriptionUrl: `${descriptionPath}absentChess.txt`,
        interactiveImg: true,
        previewHeight: "40%",
    },
    cartridge4: {
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
            {
                title: "GitHub:",
                link: "https://github.com/jjabides"
            }
        ]
    },
}



export default cartridgeData;