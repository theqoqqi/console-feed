interface Storage {
    name: string;
    body: object;
    proto: string;
}
declare const _default: {
    type: string;
    lookup: MapConstructor;
    shouldTransform(type: any, obj: any): boolean;
    toSerializable(map: any): Storage;
    fromSerializable(data: Storage): {};
};
/**
 * Serialize a Map into JSON
 */
export default _default;
