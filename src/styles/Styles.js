import background_image from "../assets/background_image.jpg"

//these are the styles for the project, this will later get broken up into more files.

//this is the styling for the entire app background and consists of a repeat image to add texture
export const background = {
    minHeight: "100vh",
    backgroundImage: `url(${background_image})`,
    backgroundRepeat: "repeat"
}