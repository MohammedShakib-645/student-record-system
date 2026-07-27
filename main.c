#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// ─── Student Structure ───────────────────────────────────────────────
struct Student {
    int    id;
    char   name[50];
    char   branch[30];
    int    year;
    float  cgpa;
};

// ─── File name ───────────────────────────────────────────────────────
#define FILE_NAME "students.dat"

// ─── Function Declarations ───────────────────────────────────────────
void addStudent();
void displayAll();
void searchStudent();
void updateStudent();
void deleteStudent();
void printMenu();
void printLine();
void printStudentHeader();
void printStudentRow(struct Student s);

// ─── Main ────────────────────────────────────────────────────────────
int main() {
    int choice;

    printf("\n");
    printf("  ╔══════════════════════════════════════════╗\n");
    printf("  ║    STUDENT RECORD MANAGEMENT SYSTEM      ║\n");
    printf("  ║        Built in C by Mohammed Shakib     ║\n");
    printf("  ╚══════════════════════════════════════════╝\n");

    while (1) {
        printMenu();
        printf("  Enter choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: addStudent();     break;
            case 2: displayAll();     break;
            case 3: searchStudent();  break;
            case 4: updateStudent();  break;
            case 5: deleteStudent();  break;
            case 6:
                printf("\n  Goodbye! Exiting...\n\n");
                exit(0);
            default:
                printf("\n  [!] Invalid choice. Please try again.\n");
        }
    }

    return 0;
}

// ─── Print Menu ──────────────────────────────────────────────────────
void printMenu() {
    printf("\n  ┌─────────────────────────────┐\n");
    printf("  │         MAIN MENU           │\n");
    printf("  ├─────────────────────────────┤\n");
    printf("  │  1. Add Student             │\n");
    printf("  │  2. Display All Students    │\n");
    printf("  │  3. Search Student by ID    │\n");
    printf("  │  4. Update Student          │\n");
    printf("  │  5. Delete Student          │\n");
    printf("  │  6. Exit                    │\n");
    printf("  └─────────────────────────────┘\n");
}

// ─── Print helpers ───────────────────────────────────────────────────
void printLine() {
    printf("  +-----+----------------------+--------------------+------+------+\n");
}

void printStudentHeader() {
    printLine();
    printf("  | %-3s | %-20s | %-18s | %-4s | %-4s |\n",
           "ID", "Name", "Branch", "Year", "CGPA");
    printLine();
}

void printStudentRow(struct Student s) {
    printf("  | %-3d | %-20s | %-18s | %-4d | %-4.2f |\n",
           s.id, s.name, s.branch, s.year, s.cgpa);
}

// ─── Add Student ─────────────────────────────────────────────────────
void addStudent() {
    FILE *fp = fopen(FILE_NAME, "ab");
    if (fp == NULL) {
        printf("\n  [!] Error opening file.\n");
        return;
    }

    struct Student s;

    printf("\n  ── Add New Student ──\n");
    printf("  Student ID   : ");
    scanf("%d", &s.id);
    printf("  Name         : ");
    scanf(" %[^\n]", s.name);
    printf("  Branch       : ");
    scanf(" %[^\n]", s.branch);
    printf("  Year (1-4)   : ");
    scanf("%d", &s.year);
    printf("  CGPA (0-10)  : ");
    scanf("%f", &s.cgpa);

    fwrite(&s, sizeof(struct Student), 1, fp);
    fclose(fp);

    printf("\n  [✓] Student added successfully!\n");
}

// ─── Display All Students ────────────────────────────────────────────
void displayAll() {
    FILE *fp = fopen(FILE_NAME, "rb");
    if (fp == NULL) {
        printf("\n  [!] No records found. Add students first.\n");
        return;
    }

    struct Student s;
    int count = 0;

    printf("\n  ── All Student Records ──\n");
    printStudentHeader();

    while (fread(&s, sizeof(struct Student), 1, fp) == 1) {
        printStudentRow(s);
        count++;
    }

    printLine();
    printf("  Total Records: %d\n", count);
    fclose(fp);

    if (count == 0) {
        printf("\n  [!] No records found.\n");
    }
}

// ─── Search Student by ID ────────────────────────────────────────────
void searchStudent() {
    FILE *fp = fopen(FILE_NAME, "rb");
    if (fp == NULL) {
        printf("\n  [!] No records found.\n");
        return;
    }

    int searchId;
    printf("\n  ── Search Student ──\n");
    printf("  Enter Student ID: ");
    scanf("%d", &searchId);

    struct Student s;
    int found = 0;

    while (fread(&s, sizeof(struct Student), 1, fp) == 1) {
        if (s.id == searchId) {
            printf("\n  [✓] Student Found:\n");
            printStudentHeader();
            printStudentRow(s);
            printLine();
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("\n  [!] Student with ID %d not found.\n", searchId);
    }

    fclose(fp);
}

// ─── Update Student ──────────────────────────────────────────────────
void updateStudent() {
    FILE *fp = fopen(FILE_NAME, "r+b");
    if (fp == NULL) {
        printf("\n  [!] No records found.\n");
        return;
    }

    int searchId;
    printf("\n  ── Update Student ──\n");
    printf("  Enter Student ID to update: ");
    scanf("%d", &searchId);

    struct Student s;
    int found = 0;
    long pos;

    while (fread(&s, sizeof(struct Student), 1, fp) == 1) {
        if (s.id == searchId) {
            printf("\n  Current data:\n");
            printStudentHeader();
            printStudentRow(s);
            printLine();

            printf("\n  Enter new details:\n");
            printf("  Name         : ");
            scanf(" %[^\n]", s.name);
            printf("  Branch       : ");
            scanf(" %[^\n]", s.branch);
            printf("  Year (1-4)   : ");
            scanf("%d", &s.year);
            printf("  CGPA (0-10)  : ");
            scanf("%f", &s.cgpa);

            // Go back to the position of this record and overwrite
            fseek(fp, -(long)sizeof(struct Student), SEEK_CUR);
            fwrite(&s, sizeof(struct Student), 1, fp);

            printf("\n  [✓] Student updated successfully!\n");
            found = 1;
            break;
        }
    }

    if (!found) {
        printf("\n  [!] Student with ID %d not found.\n", searchId);
    }

    fclose(fp);
}

// ─── Delete Student ──────────────────────────────────────────────────
void deleteStudent() {
    FILE *fp = fopen(FILE_NAME, "rb");
    if (fp == NULL) {
        printf("\n  [!] No records found.\n");
        return;
    }

    int searchId;
    printf("\n  ── Delete Student ──\n");
    printf("  Enter Student ID to delete: ");
    scanf("%d", &searchId);

    // Read all records into a temp array
    struct Student students[500];
    int count = 0;
    int found = 0;

    while (fread(&students[count], sizeof(struct Student), 1, fp) == 1) {
        if (students[count].id == searchId) {
            found = 1;
        } else {
            count++;
        }
    }
    fclose(fp);

    if (!found) {
        printf("\n  [!] Student with ID %d not found.\n", searchId);
        return;
    }

    // Rewrite file without the deleted record
    fp = fopen(FILE_NAME, "wb");
    for (int i = 0; i < count; i++) {
        fwrite(&students[i], sizeof(struct Student), 1, fp);
    }
    fclose(fp);

    printf("\n  [✓] Student with ID %d deleted successfully!\n", searchId);
}
