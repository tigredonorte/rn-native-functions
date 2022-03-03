export enum PlaceRoutes {
    PlaceList = "PlaceList",
    PlaceDetails = "PlaceDetails",
    PlaceForm = "PlaceForm",
}

export type PlaceStackType = {
    [PlaceRoutes.PlaceList]: undefined;
    [PlaceRoutes.PlaceDetails]: { id: string; title: string; };
    [PlaceRoutes.PlaceForm]: undefined;
};