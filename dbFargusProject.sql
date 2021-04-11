PGDMP         .                y            fargus_project_db    13.0    13.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    81920    fargus_project_db    DATABASE     m   CREATE DATABASE fargus_project_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
 !   DROP DATABASE fargus_project_db;
                postgres    false            �            1259    81923    publications    TABLE     �   CREATE TABLE public.publications (
    publication_id integer NOT NULL,
    publication_content character varying,
    imgsrc character varying,
    publication_father integer
);
     DROP TABLE public.publications;
       public         heap    postgres    false            �            1259    81921    publications_publication_id_seq    SEQUENCE     �   CREATE SEQUENCE public.publications_publication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.publications_publication_id_seq;
       public          postgres    false    201            �           0    0    publications_publication_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.publications_publication_id_seq OWNED BY public.publications.publication_id;
          public          postgres    false    200            #           2604    81926    publications publication_id    DEFAULT     �   ALTER TABLE ONLY public.publications ALTER COLUMN publication_id SET DEFAULT nextval('public.publications_publication_id_seq'::regclass);
 J   ALTER TABLE public.publications ALTER COLUMN publication_id DROP DEFAULT;
       public          postgres    false    200    201    201            �          0    81923    publications 
   TABLE DATA           g   COPY public.publications (publication_id, publication_content, imgsrc, publication_father) FROM stdin;
    public          postgres    false    201   �       �           0    0    publications_publication_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.publications_publication_id_seq', 53, true);
          public          postgres    false    200            %           2606    81931    publications publications_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_pkey PRIMARY KEY (publication_id);
 H   ALTER TABLE ONLY public.publications DROP CONSTRAINT publications_pkey;
       public            postgres    false    201            �   �  x���]o�0���_�]l�r�$��J�ҕt+�~.R%�$n0$��M�_�-l�չ�9�y���Xh�̩�6M�$�bK���u�M�i�J0�O��KBw��t%u��8�T��x/!�Y�+@��aA��(�T&r�U�
� Ni�ϝ\�-�����vr:����ڈt����p'J���G�^u��
]Op�Tɷ�Y�����Q���C3
�K0G�ʌM+��(-�x��o<��(ꐨya��wqo{�lr���mB-خ������zzkӒr��vPʌ�����']�j�5����4r�NՕ%���ě����5�����~����yS�'��avI�'KX�����i\�)�O:�(���N���Y�h%kZ�}�Q8�� w�*I���x���tMM\+���|^�������+�G�|�ςn��ƣcY�_w��I     