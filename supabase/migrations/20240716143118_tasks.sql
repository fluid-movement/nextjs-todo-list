CREATE TABLE task_lists
(
    id           UUID PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks
(
    id           UUID PRIMARY KEY,
    description  TEXT    NOT NULL,
    done_status  BOOLEAN NOT NULL DEFAULT FALSE,
    task_lists_id  UUID NOT NULL,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_lists_id) REFERENCES task_lists (id)
);

-- Function to update date_updated column
CREATE OR REPLACE FUNCTION update_task_lists_date_updated()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.date_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to use the function
CREATE TRIGGER task_lists_before_update
    BEFORE UPDATE
    ON task_lists
    FOR EACH ROW
EXECUTE FUNCTION update_task_lists_date_updated();