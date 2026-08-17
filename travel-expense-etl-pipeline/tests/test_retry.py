import unittest

from src.pipeline import TransientExtractError, with_retry


class TestWithRetry(unittest.TestCase):
    def test_succeeds_after_transient_failures(self):
        calls = {"count": 0}

        @with_retry(retries=3, base_delay_seconds=0)
        def flaky():
            calls["count"] += 1
            if calls["count"] < 3:
                raise TransientExtractError("temporary glitch")
            return "ok"

        self.assertEqual(flaky(), "ok")
        self.assertEqual(calls["count"], 3)

    def test_gives_up_after_max_retries(self):
        calls = {"count": 0}

        @with_retry(retries=2, base_delay_seconds=0)
        def always_fails():
            calls["count"] += 1
            raise TransientExtractError("still broken")

        with self.assertRaises(TransientExtractError):
            always_fails()
        self.assertEqual(calls["count"], 3)  # initial attempt + 2 retries

    def test_non_transient_errors_are_not_retried(self):
        calls = {"count": 0}

        @with_retry(retries=3, base_delay_seconds=0)
        def bad_input():
            calls["count"] += 1
            raise ValueError("not retryable")

        with self.assertRaises(ValueError):
            bad_input()
        self.assertEqual(calls["count"], 1)


if __name__ == "__main__":
    unittest.main()
