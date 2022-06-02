const descriptionPath = "./src/assets/cartridgeDescriptions/";
const imagesPath = "./src/assets/images/"

const cartridgeData = {

    cartridge1: {
        images: ["./src/assets/images/temple.jpg"],
        icon: "./src/assets/images/temple.jpg",
        title: "Test",
        descriptionUrl: `${descriptionPath}testFile.txt`,
        interactiveImg: true
    },
    cartridge2: {
        images: [
            `${imagesPath}Track_Attack_Preview1.PNG`,
            `${imagesPath}Track_Attack_Preview2.PNG`, 
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
    }

}



export default cartridgeData;