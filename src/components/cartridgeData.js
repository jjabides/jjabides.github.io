const descriptionPath = "./src/assets/cartridgeDescriptions/";
const imagesPath = "./src/assets/images/"

const cartridgeData = {

    cartridge1: {
        images: ["./src/assets/images/temple.jpg"],
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
        title: "Track Attack",
        descriptionUrl: `${descriptionPath}`,
        interactiveImg: true
    }

}



export default cartridgeData;