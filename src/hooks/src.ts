export function getImageSrc(src: string | null) {
    const imageDirectory = process.env.IMAGE_DIRECTORY || '';
    return imageDirectory + src
}