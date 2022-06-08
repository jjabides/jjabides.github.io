const descriptionPath = "cartridgeDescriptions/";
const imagesPath = "images/";

const cartridgeData = {

    cartridge1: {
        images: [`${imagesPath}temple.jpg`],
        icon: `${imagesPath}temple.jpg`,
        title: "Test",
        descriptionUrl: `${descriptionPath}testFile.txt`,
        interactiveImg: true
    },
    cartridge2: {
        images: [
            `${imagesPath}Track_Attack_Gameplay.gif`,
            `${imagesPath}Track_Attack_Preview1.PNG`, 
            `${imagesPath}Track_Attack_Preview3.PNG`
        ],
        icon: `${imagesPath}Track_Attack_Preview1.PNG`,
        title: "Track Attack",
        descriptionUrl: `${descriptionPath}trackAttack.txt`,
        interactiveImg: true,
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
        icon: `${imagesPath}AbsentChess_Preview1.PNG`,
        title: "Absent Chess",
        descriptionUrl: `${descriptionPath}absentChess.txt`,
        interactiveImg: true
    },
    cartridge4: {
        images: [
            `${imagesPath}Me.jpg`,
        ],
        icon: `${imagesPath}Me.jpg`,
        title: "About Me",
        descriptionUrl: `${descriptionPath}aboutMe.txt`,
        interactiveImg: false,
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