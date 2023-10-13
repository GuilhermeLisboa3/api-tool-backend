-- CreateTable
CREATE TABLE "tools" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dateOfCollection" TIMESTAMP(3),
    "dateOfDevolution" TIMESTAMP(3),
    "mechanicName" TEXT,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);
