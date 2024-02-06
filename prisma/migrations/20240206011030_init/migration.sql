-- CreateTable
CREATE TABLE "Counter" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sumLabel" TEXT,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "counterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "sortIndex" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_counterId_name_key" ON "Member"("counterId", "name");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_counterId_fkey" FOREIGN KEY ("counterId") REFERENCES "Counter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
