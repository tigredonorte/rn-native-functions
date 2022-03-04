export interface ValidationItem {
    type: 'integer' | 'text' | 'real',
    primary?: boolean;
    required: boolean;
    editable: boolean;
}

export type ValidationType<Model> = { 
    [Property in keyof Model]: ValidationItem;
}