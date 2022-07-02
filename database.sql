CREATE TABLE "quests" (
    "id" SERIAL PRIMARY KEY,
    "list" VARCHAR(250) NOT NULL,
    "complete" BOOLEAN DEFAULT FALSE

);

INSERT INTO "quests"("list","complete") 
VALUES ('8 bananas','true'),('100 bags of XXXtra Hot Cheetos', 'false'),('run 5 miles','false'),('summer body','false');