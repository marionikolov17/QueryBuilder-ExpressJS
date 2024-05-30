export interface QueryParams {
    limit: number | null | undefined;
    offset: number | null | undefined;
    what: Record<string, number>;
    condition: {
        type: string,
        items: Array<Condition>
    }
}

export interface Condition {
    field: string;
    operation: string;
    value: any;
}