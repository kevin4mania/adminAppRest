export interface ResAPI {
    ok:                 boolean;
    codError:           string;
    registroMetodosBDD: RegistroMetodosBDD[];
}

export interface RegistroMetodosBDD {
    _id:         string;
    URL:         string;
    __v:         number;
    name:        string;
    description: string;
    observation: string;
    online:      boolean;
}
