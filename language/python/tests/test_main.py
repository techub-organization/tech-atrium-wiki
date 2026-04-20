from main import main


def test_main_runs(capsys):
    main()
    captured = capsys.readouterr()
    assert "techrium python tools bootstrap" in captured.out
