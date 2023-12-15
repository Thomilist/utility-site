-- CreateTable
CREATE TABLE "DeathCounter" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "DeathCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "deathCounterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "deaths" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_deathCounterId_name_key" ON "Member"("deathCounterId", "name");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_deathCounterId_fkey" FOREIGN KEY ("deathCounterId") REFERENCES "DeathCounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
