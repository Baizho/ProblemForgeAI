import sys
import random
import uuid

def random_case():
    n = random.randint(1, 10**5)
    s = random.randint(0, 10**9)
    t = random.randint(0, 10**9)
    k = random.randint(0, 10**9)
    a = [random.randint(0, 10**9) for _ in range(n)]
    return f"{n}\n{s} {t} {k}\n{' '.join(map(str, a))}\n"

def edge_case():
    cases = [
        f"1\n0 0 0\n0\n",
        f"10**5\n10**9 10**9 10**9\n{' '.join(str(10**9) for _ in range(10**5))}\n",
        f"1\n0 10**9 0\n10**9\n",
        f"1\n10**9 0 10**9\n0\n",
        f"10**5\n0 0 10**9\n{' '.join(str(0) for _ in range(10**5))}\n",
    ]
    return random.choice(cases)

def generate_test_cases(num_cases):
    file_names = []
    edge_case_count = max(1, int(num_cases * 0.05))
    random_case_count = num_cases - edge_case_count

    for i in range(edge_case_count):
        file_name = f"{uuid.uuid4()}.txt"
        with open(file_name, "w") as f:
            f.write(edge_case())
        file_names.append(file_name)

    for i in range(random_case_count):
        file_name = f"{uuid.uuid4()}.txt"
        with open(file_name, "w") as f:
            f.write(random_case())
        file_names.append(file_name)

    return file_names

if __name__ == "__main__":
    num_cases = int(sys.argv[1])
    file_names = generate_test_cases(num_cases)
    print(file_names)
