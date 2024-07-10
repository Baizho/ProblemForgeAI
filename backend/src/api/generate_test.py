import sys
import random
import uuid

def generate_random_case(n, x):
    a = sorted([random.randint(-10**9, 10**9) for _ in range(n)])
    return f"{n} {x}\n" + " ".join(map(str, a))

def generate_edge_case(n, x):
    if n == 1:
        return f"{n} {x}\n{x}"
    elif x == -10**9:
        return f"{n} {x}\n" + " ".join(map(str, [-10**9] * n))
    elif x == 10**9:
        return f"{n} {x}\n" + " ".join(map(str, [10**9] * n))
    else:
        return f"{n} {x}\n" + " ".join(map(str, [random.randint(-10**9, 10**9) for _ in range(n)]))

def generate_test_cases(num_cases):
    file_names = []
    for i in range(num_cases):
        n = random.randint(1, 10**5)
        x = random.randint(-10**9, 10**9)
        case_type = random.choices(['random', 'edge'], weights=[0.9, 0.1])[0]
        if case_type == 'random':
            case = generate_random_case(n, x)
        else:
            case = generate_edge_case(n, x)

        file_name = f"test_{str(uuid.uuid4())}.txt"
        with open(file_name, 'w') as f:
            f.write(case)
        file_names.append(file_name)
    return file_names

if __name__ == "__main__":
    num_cases = int(sys.argv[1])
    file_names = generate_test_cases(num_cases)
    print(file_names)
