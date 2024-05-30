export interface QueryParams {
    limit: number | null | undefined;
    offset: number | null | undefined;
    what: Record<string, number> | null | undefined;
    condition: {
        type: string,
        items: Array<Condition>
    } | null | undefined
}

export interface Condition {
    field: string;
    operation: string;
    value: any;
}