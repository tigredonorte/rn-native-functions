import React from 'react';

export enum PlaceRoutes {
    List = "PlaceList",
    Details = "PlaceDetails",
    Add = "PlaceAdd",
    Edit = "PlaceEdit",
    Map = "PlaceMap",
}

export type PlaceStackType = {
    [PlaceRoutes.List]: undefined;
    [PlaceRoutes.Details]: { id: string; title: string; };
    [PlaceRoutes.Add]: undefined;
    [PlaceRoutes.Edit]: { id: string; title: string; };
    [PlaceRoutes.Map]: { id: string; title: string; };
};