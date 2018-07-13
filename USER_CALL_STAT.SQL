
--#====================================================================================================
--#  OBJECT NAME   :  USER_CALL_STAT
--#  DESCRIPTION   :  個人集計（コール数一覧）
--#
--#  CHANGE HISTORY
--#   ----------    --------------------------------------------------    ------------
--#   DATE            DESCRIPTION                                             AUTHOR
--#   ----------    --------------------------------------------------    ------------
--#   
--#
--#====================================================================================================
CREATE OR REPLACE FUNCTION PUBLIC.USER_CALL_STAT (
              P_CHANGE_TYPE         VARCHAR(1)
            , P_CALL_DT             DATE
            , P_CALL_HOUR           VARCHAR
            , P_CALL_USER_ID        VARCHAR
            , P_CALL_RST_ID         VARCHAR
            , P_CALL_RST_RANK_CD    VARCHAR
            , P_BIZ_ID              NUMERIC
            --, P_COM_PROD            NUMERIC
            )
RETURNS integer  AS $$
DECLARE
    C_SYS_ADMIN_ID  VARCHAR := 'tmadmin';
    V_CALL_DT       S018_USER_CALL_STAT.CALL_DT%TYPE;
    V_CALL_TIME     VARCHAR;
    N_CNT           INTEGER:=0;
    N_ID            NUMERIC;
	result integer;
BEGIN
    	result = 2;
     IF P_CHANGE_TYPE = 'U'
        --AND P_CALL_USER_ID <> C_SYS_ADMIN_ID 
        AND P_CALL_DT IS NOT NULL
    THEN
    	result = 3;
        --EXISTS チェックする    
        SELECT CALL_CNT,USER_CALL_STAT_ID
          INTO  N_CNT
               ,N_ID
          FROM S018_USER_CALL_STAT S018
         WHERE S018.CALL_DT = P_CALL_DT
           AND S018.CALL_HOUR = P_CALL_HOUR
           AND S018.BIZ_ID = P_BIZ_ID
           AND S018.USER_ID = P_CALL_RST_ID
           AND S018.CALL_RST_ID = P_CALL_RST_ID
           AND S018.CALL_RST_RANK_CD = coalesce(P_CALL_RST_RANK_CD,' ');
           result = 4;
        IF N_CNT IS NOT NULL AND N_CNT> 0 THEN
        	result = 5;
            UPDATE S018_USER_CALL_STAT S018
               SET S018.CALL_CNT = S018.CALL_CNT + 1
                ,  S018.UPD_USER_ID = P_CALL_USER_ID
                ,  S018.UPD_DT = NOW()
             WHERE S018.USER_CALL_STAT_ID = N_ID;
        ELSE
        result = 6;
            INSERT INTO S018_USER_CALL_STAT(
                USER_CALL_STAT_ID,
                INS_USER_ID,
                INS_DT,
                UPD_USER_ID,
                UPD_DT,
                CALL_DT,
                CALL_HOUR,
                BIZ_ID,
                USER_ID,
                CALL_RST_ID,
                CALL_RST_RANK_CD,
                CALL_CNT)
            VALUES(
                nextval('seq_s018_user_call_stat_id') ,   -- USER_CALL_STAT_ID
                P_CALL_USER_ID ,                        -- INS_USER_ID
                now() ,                                 -- INS_DT
                P_CALL_USER_ID ,                        -- UPD_USER_ID
                now() ,                                 -- UPD_DT
                P_CALL_DT ,                             -- CALL_DT
                P_CALL_HOUR ,                           -- CALL_HOUR
                P_BIZ_ID ,                             -- BIZ_ID
                P_CALL_USER_ID ,                        -- USER_ID
                P_CALL_RST_ID ,                         -- CALL_RST_ID
                coalesce(P_CALL_RST_RANK_CD,' ') ,      -- CALL_RST_RANK_CD
                1 );                   
        END IF;
    END IF;
	if found then
  		GET DIAGNOSTICS result = ROW_COUNT;
  		return result;
	else
  		return -result;
	end if;
END;
$$ LANGUAGE plpgsql;