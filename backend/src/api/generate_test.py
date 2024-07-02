import sys
import random
import uuid


def generate_random_case():
    n = random.randint(1, 10**7)
    q = random.randint(1, min(10**5, n))
    queries = [(random.randint(1, n), random.randint(1, n)) for _ in range(q)]
    queries = [(min(l, r), max(l, r)) for l, r in queries]
    return n, q, queries


def generate_edge_case(case):
    edge_cases = [
        (1, 1, [(1, 1)]),
        (10**7, 10**5, [(1, 10**7)] + [(random.randint(1, 10**7), random.randint(1, 10**7)) for _ in range(10**5 - 1)]),
        (10**7, 1, [(1, 10**7)]),
        (10**5, 10**5, [(i, i) for i in range(1, 10**5 + 1)]),
        (10, 10, [(1, 10), (2, 9), (3, 8), (4, 7), (5, 6), (6, 5), (7, 4), (8, 3), (9, 2), (10, 1)])
    ]
    return edge_cases[case % len(edge_cases)]


def save_test_case(n, q, queries):
    filename = f"test_{uuid.uuid4()}.txt"
    with open(filename, 'w') as f:
        f.write(f"{n} {q}\n")
        for l, r in queries:
            f.write(f"{l} {r}\n")
    return filename


def generate_test_cases():
    total_cases = int(sys.argv[1])
    edge_cases = min(max(1, total_cases // 10), 10)
    file_names = []

    for i in range(edge_cases):
        n, q, queries = generate_edge_case(i)
        file_names.append(save_test_case(n, q, queries))

    for i in range(total_cases - edge_cases):
        n, q, queries = generate_random_case()
        file_names.append(save_test_case(n, q, queries))

    return file_names


if __name__ == "__main__":
    file_names = generate_test_cases()
    print(file_names)