-- CreateTable
CREATE TABLE "Url" (
    "base" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "id" TEXT NOT NULL,
    "updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
    "xata_version" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_id_key" ON "Url"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Url__pgroll_new_xata_id_key" ON "Url"("xata_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
