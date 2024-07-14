export default function decodeJSON(jsonString) {
    let parsedObjects = [];

    let jsonObjects = jsonString.split('}{');

    jsonObjects.forEach((jsonStr, index) => {
        if (index < jsonObjects.length - 1) {
            jsonStr += '}';
        }

        if (index > 0) {
            jsonStr = '{' + jsonStr;
        }

        try {
            let parsedObj = JSON.parse(jsonStr);
            parsedObjects.push(parsedObj);
        } catch (error) {
            console.error('Error parsing JSON at index', index, ':', error);
        }
    });

    return JSON.parse(jsonObjects);
}