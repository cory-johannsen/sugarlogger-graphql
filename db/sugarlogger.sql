
--
-- Name: reading; Type: TABLE; Schema: public; Owner: sugarlogger; Tablespace:
--

CREATE TABLE reading (
    id bigint NOT NULL,
    value bigint NOT NULL,
    taken_at timestamp with time zone DEFAULT now()
);


ALTER TABLE reading OWNER TO sugarlogger;

--
-- Name: reading_id_seq; Type: SEQUENCE; Schema: public; Owner: sugarlogger
--

CREATE SEQUENCE reading_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reading_id_seq OWNER TO sugarlogger;

--
-- Name: reading_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sugarlogger
--

ALTER SEQUENCE reading_id_seq OWNED BY reading.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: sugarlogger
--

ALTER TABLE ONLY reading ALTER COLUMN id SET DEFAULT nextval('reading_id_seq'::regclass);

--
-- Name: dose; Type: TABLE; Schema: public; Owner: sugarlogger; Tablespace:
--

CREATE TABLE dose (
    id bigint NOT NULL,
    value bigint NOT NULL,
    taken_at timestamp with time zone DEFAULT now()
);


ALTER TABLE dose OWNER TO sugarlogger;

--
-- Name: dose_id_seq; Type: SEQUENCE; Schema: public; Owner: sugarlogger
--

CREATE SEQUENCE dose_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dose_id_seq OWNER TO sugarlogger;

--
-- Name: dose_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sugarlogger
--

ALTER SEQUENCE dose_id_seq OWNED BY dose.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: sugarlogger
--

ALTER TABLE ONLY dose ALTER COLUMN id SET DEFAULT nextval('dose_id_seq'::regclass);
