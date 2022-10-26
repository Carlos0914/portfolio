import client from "./client";

export const saveFile = async (file, baseDir) => {
    try {
        const {
            response: { signedUrl, assetUrl }
        } = await client("/assets/getSecureUrl", {
            method: "POST",
            body: JSON.stringify({
                path: `${baseDir}/${file.name}`
            })
        });
        
        const blob = new Blob([file], { type: file.type });
        const response2 = await fetch(signedUrl, { method: "PUT", body: blob });
        if (response2.ok) {
            return [true, assetUrl];
        } else {
            throw new Error(
                "Something went wrong when uploading your file, please try again"
            );
        }
    } catch (e) {
        return [false, e.message];
    }
};